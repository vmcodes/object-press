import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from '../auth/dto';
import {
  CreatePost,
  UpdatePost,
  PostArgs,
  BlogArgs,
  SearchTitles,
  RemoveImage,
} from './dto';
import { Post } from './model';
import { Blog } from '../blogs/model';
import search from '../utils/search';
import { NotificationService } from '../notify/notify.service';
import { sortPosts } from '../utils/sorts';
import { constants } from '../constants';
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: constants.accessKeyId,
  secretAccessKey: constants.secretAccessKey,
  region: 'us-east-1',
});

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    private readonly notificationService: NotificationService
  ) {}

  async create(user: JwtPayload, createPost: CreatePost) {
    try {
      const blog: Blog = await this.blogModel.findOne({
        _id: createPost.appId,
      });

      const post = {
        userId: user.sub,
        createDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
        userSecret: blog.userSecret,
        appSecret: blog.appSecret,
        ...createPost,
      };

      const createdPost = new this.postModel(post);
      await createdPost.save();

      const data = {
        title: `New Post!`,
        content: `Your recent post was successfully created!`,
        email: false,
      };

      await this.notificationService.create(user, data);

      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  }

  async update(user: JwtPayload, updatePost: UpdatePost) {
    const post = {
      _id: updatePost.postId,
      userId: user.sub,
      post: updatePost.post,
      active: updatePost.active,
      modifiedDate: new Date().toISOString(),
    };

    try {
      const updatedPost = new this.postModel(post);
      await updatedPost.updateOne(updatedPost);

      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  }

  async removeImage(user: JwtPayload, removeImage: RemoveImage) {
    const content = await this.postModel.findOne({
      _id: removeImage.postId,
      userId: user.sub,
    });

    try {
      const post = content.post;
      const images = post.images;
      const altTags = post.altTags;

      const altIndex = post.images.indexOf(removeImage.image);
      const altArr = altTags.filter((tag, index) => {
        if (index !== altIndex) {
          return tag;
        }
      });

      const imagesArr = images.filter((image) => {
        if (image !== removeImage.image) {
          return image;
        }
      });

      const update = {
        _id: content._id,
        post: {
          title: post.title,
          publishAt: post.publishAt,
          content: post.content,
          pageTitle: post.pageTitle,
          slug: post.slug,
          keywords: post.keywords,
          description: post.description,
          images: imagesArr,
          altTags: altArr,
        },
        modifiedDate: new Date().toISOString(),
      };

      const updatedPost = new this.postModel(update);
      await updatedPost.updateOne(updatedPost);

      // const imagePath = removeImage.image.split('/')[2];
      // console.log(imagePath);

      // const s3 = new AWS.S3();
      //
      // await s3.deleteObject(
      //   { Bucket: 'objectpress', Key: imagePath },
      //   (err, data) => {
      //     console.error(err);
      //     console.log(data);
      //   }
      // );

      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  }

  async delete(user: JwtPayload, args: PostArgs) {
    try {
      await this.postModel.deleteOne({
        _id: args.postId,
        userId: user.sub,
      });

      return true;
    } catch {
      return false;
    }
  }

  async findAll(user: JwtPayload): Promise<Post[]> {
    const posts = await this.postModel.find({
      userId: user.sub,
    });

    return sortPosts(posts, 'post', 'publishAt');
  }

  async searchTitles(
    user: JwtPayload,
    searchTitles: SearchTitles
  ): Promise<Post[]> {
    const blogs = await this.postModel.find({
      userId: user.sub,
    });

    const posts = await search(blogs, ['post.title'], searchTitles.title);

    return sortPosts(posts, 'post', 'publishAt');
  }

  async findOne(user: JwtPayload, args: PostArgs): Promise<Post> {
    return await this.postModel.findOne({
      _id: args.postId,
      userId: user.sub,
    });
  }

  async findBlog(user: JwtPayload, args: BlogArgs): Promise<Post[]> {
    const posts = await this.postModel.find({
      userId: user.sub,
      appId: args.appId,
    });

    return sortPosts(posts, 'post', 'publishAt');
  }
}

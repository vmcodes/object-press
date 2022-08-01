import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogArgs, CreateBlog, UpdateBlog } from './dto';
import { Blog } from './model';
import { v4 as uuid4 } from 'uuid';
import { constants } from '../constants';
import { JwtPayload } from '../auth/dto';
import { NotificationService } from '../notify/notify.service';
import { PostService } from '../posts/post.service';
const { createHmac } = require('crypto');

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    private readonly postService: PostService,
    private readonly notificationService: NotificationService
  ) {}

  async create(user: JwtPayload, newBlog: CreateBlog) {
    const id = uuid4();

    const blogSecret = createHmac('SHA256', constants.blogSecret)
      .update(id)
      .digest('base64');

    const userSecret = createHmac('SHA256', constants.userSecret)
      .update(user.sub)
      .digest('base64');

    const blog = {
      userId: user.sub,
      appSecret: blogSecret,
      userSecret: userSecret,
      title: newBlog.title,
      hook: newBlog?.hook || '',
      description: newBlog?.description || '',
      active: newBlog.active,
      createDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
    };

    try {
      const createdBlog = new this.blogModel(blog);
      await createdBlog.save();

      const data = {
        title: `New Blog!`,
        content: `Congrats on your new blog '${newBlog.title}', now it's time to make your first post!`,
        email: false,
      };

      await this.notificationService.create(user, data);

      return true;
    } catch {
      return false;
    }
  }

  async update(updateBlog: UpdateBlog) {
    const blog = {
      _id: updateBlog.appId,
      title: updateBlog.title,
      hook: updateBlog?.hook || '',
      description: updateBlog?.description || '',
      active: updateBlog.active,
      modifiedDate: new Date().toISOString(),
    };

    try {
      const updatedBlog = new this.blogModel(blog);
      await updatedBlog.updateOne(updatedBlog);

      return true;
    } catch {
      return false;
    }
  }

  async delete(user: JwtPayload, args: BlogArgs) {
    try {
      await this.blogModel.deleteOne({
        _id: args.appId,
        userId: user.sub,
      });

      const posts = await this.postService.findBlog(user, {
        appId: args.appId,
      });

      for (const post in posts) {
        await this.postService.delete(user, { postId: posts[post]._id });
      }

      return true;
    } catch {
      return false;
    }
  }

  async findAll(user: JwtPayload): Promise<Blog[]> {
    return await this.blogModel
      .find({
        userId: user.sub,
      })
      .sort({ createDate: 'desc' });
  }

  async findOne(user: JwtPayload, args: BlogArgs): Promise<Blog> {
    return await this.blogModel.findOne({
      _id: args.appId,
      userId: user.sub,
    });
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import {
  CreatePost,
  UpdatePost,
  PostArgs,
  BlogArgs,
  SearchTitles,
  RemoveImage,
} from './dto';
import { Post } from './model';
import { CurrentUser, JwtPayload } from 'src/auth/dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';

@Resolver((of) => Post)
@UseGuards(JwtAuthGuard)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation((returns) => Boolean)
  async addPost(
    @CurrentUser() user: JwtPayload,
    @Args('newPostData') newPost: CreatePost
  ) {
    return await this.postService.create(user, newPost);
  }

  @Mutation((returns) => Boolean)
  async updatePost(
    @CurrentUser() user: JwtPayload,
    @Args('updatePostData') updatePost: UpdatePost
  ) {
    return await this.postService.update(user, updatePost);
  }

  @Mutation((returns) => Boolean)
  async removeImage(
    @CurrentUser() user: JwtPayload,
    @Args('removePostImage') removeImage: RemoveImage
  ) {
    return await this.postService.removeImage(user, removeImage);
  }

  @Mutation((returns) => Boolean)
  async removePost(
    @CurrentUser() user: JwtPayload,
    @Args() removePost: PostArgs
  ) {
    return await this.postService.delete(user, removePost);
  }

  @Query((returns) => [Post])
  async getAllPosts(@CurrentUser() user: JwtPayload): Promise<Post[]> {
    return await this.postService.findAll(user);
  }

  @Query((returns) => Post)
  async getPost(
    @CurrentUser() user: JwtPayload,
    @Args() getPost: PostArgs
  ): Promise<Post> {
    return await this.postService.findOne(user, getPost);
  }

  @Query((returns) => [Post])
  async searchPosts(
    @CurrentUser() user: JwtPayload,
    @Args() searchTitles: SearchTitles
  ): Promise<Post[]> {
    return await this.postService.searchTitles(user, searchTitles);
  }

  @Query((returns) => [Post])
  async getBlogPost(
    @CurrentUser() user: JwtPayload,
    @Args() getBlog: BlogArgs
  ): Promise<Post[]> {
    return await this.postService.findBlog(user, getBlog);
  }
}

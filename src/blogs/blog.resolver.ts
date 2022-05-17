import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, JwtPayload } from 'src/auth/dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { BlogService } from './blog.service';
import { CreateBlog, UpdateBlog, BlogArgs } from './dto';
import { Blog } from './model';

@Resolver((of) => Blog)
@UseGuards(JwtAuthGuard)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Mutation((returns) => Boolean)
  async addBlog(
    @CurrentUser() user: JwtPayload,
    @Args('newBlogData') newBlog: CreateBlog
  ) {
    return await this.blogService.create(user, newBlog);
  }

  @Mutation((returns) => Boolean)
  async updateBlog(@Args('updateBlogData') updateBlog: UpdateBlog) {
    return await this.blogService.update(updateBlog);
  }

  @Mutation((returns) => Boolean)
  async removeBlog(
    @CurrentUser() user: JwtPayload,
    @Args() removeBlog: BlogArgs
  ) {
    return await this.blogService.delete(user, removeBlog);
  }

  @Query((returns) => [Blog])
  async getAllBlogs(@CurrentUser() user: JwtPayload): Promise<Blog[]> {
    return await this.blogService.findAll(user);
  }

  @Query((returns) => Blog)
  async getBlog(
    @CurrentUser() user: JwtPayload,
    @Args() getBlog: BlogArgs
  ): Promise<Blog> {
    return await this.blogService.findOne(user, getBlog);
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/blogs/schema';
import { Post, PostSchema } from './schema';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { NotificationModule } from 'src/notify/notify.module';

@Module({
  imports: [
    NotificationModule,
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostsModule {}

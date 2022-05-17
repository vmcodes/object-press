import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schema';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { NotificationModule } from 'src/notify/notify.module';
import { PostsModule } from 'src/posts/post.module';

@Module({
  imports: [
    PostsModule,
    NotificationModule,
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  providers: [BlogResolver, BlogService],
  exports: [BlogService],
})
export class BlogModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from './schema';
import { BlogModule } from 'src/blogs/blog.module';
import { PostsModule } from 'src/posts/post.module';
import { UserResolver } from './user.resolver';
import { NotificationModule } from 'src/notify/notify.module';

@Module({
  imports: [
    BlogModule,
    PostsModule,
    NotificationModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}

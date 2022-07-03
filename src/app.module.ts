import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { BlogModule } from './blogs/blog.module';
import { PostsModule } from './posts/post.module';
import { NotificationModule } from './notify/notify.module';
import { ImagesModule } from './images/images.module';
import { GalleryModule } from './galleries/gallery.module';
import { constants } from './constants';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostsModule,
    BlogModule,
    ImagesModule,
    NotificationModule,
    GalleryModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: constants.databaseURI,
        useNewUrlParser: true,
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      debug: false,
      playground: false,
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}

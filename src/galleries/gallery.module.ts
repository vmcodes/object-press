import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/blogs/schema';
import { Gallery, GallerySchema } from './schema';
import { GalleryService } from './gallery.service';
import { GalleryResolver } from './gallery.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
  ],
  providers: [GalleryResolver, GalleryService],
  exports: [GalleryService],
})
export class GalleryModule {}

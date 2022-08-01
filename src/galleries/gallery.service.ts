import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GalleryArgs,
  CreateGallery,
  UpdateGallery,
  RemoveGalleryImage,
  AddGalleryImage,
} from './dto';
import { Gallery, GalleryList } from './model';
import { Blog } from '../blogs/model';
import { JwtPayload } from '../auth/dto';
import { constants } from '../constants';
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: constants.accessKeyId,
  secretAccessKey: constants.secretAccessKey,
  region: 'us-east-1',
});

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<Gallery>,
    @InjectModel(Blog.name) private blogModel: Model<Blog>
  ) {}

  async create(user: JwtPayload, newGallery: CreateGallery) {
    try {
      const gallery = {
        userId: user.sub,
        images: [],
        createDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
        ...newGallery,
      };

      const createdGallery = new this.galleryModel(gallery);
      await createdGallery.save();

      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  }

  async update(user: JwtPayload, updateGallery: UpdateGallery) {
    const gallery = {
      _id: updateGallery.galleryId,
      userId: user.sub,
      name: updateGallery.name,
      description: updateGallery.description,
      modifiedDate: new Date().toISOString(),
    };

    try {
      const updatedGallery = new this.galleryModel(gallery);
      await updatedGallery.updateOne(updatedGallery);

      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  }

  async addGalleryImage(user: JwtPayload, addImage: AddGalleryImage) {
    const gallery = await this.galleryModel.findOne({
      _id: addImage.galleryId,
      userId: user.sub,
    });

    const images = {
      _id: addImage.galleryId,
      userId: user.sub,
      images: [...gallery.images, ...addImage.images],
    };

    try {
      const updatedGallery = new this.galleryModel(images);
      await updatedGallery.updateOne(images);

      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  }

  async removeGalleryImage(user: JwtPayload, removeImage: RemoveGalleryImage) {
    const gallery = await this.galleryModel.findOne({
      _id: removeImage.galleryId,
      userId: user.sub,
    });
    const images = gallery.images.filter(
      (image) => image !== removeImage.image
    );

    const newGallery = {
      _id: removeImage.galleryId,
      userId: user.sub,
      images: images,
      modifiedDate: new Date().toISOString(),
    };

    try {
      const updatedGallery = new this.galleryModel(newGallery);
      await updatedGallery.updateOne(updatedGallery);

      // const imagePath = removeImage.image.replace(
      //   'https://share.objectpress.io',
      //   ''
      // );
      // console.log(imagePath);
      //
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

  async delete(user: JwtPayload, args: GalleryArgs) {
    try {
      const gallery = await this.galleryModel.findOne({
        _id: args.galleryId,
        userId: user.sub,
      });

      // const s3 = new AWS.S3();

      // if (gallery.images[0]) {
      //   for (const image in gallery) {
      //     const imagePath = gallery.images[image].split('/')[2];
      //     console.log(imagePath);
      //
      //     await s3.deleteObject(
      //       { Bucket: 'objectpress', Key: imagePath },
      //       (err, data) => {
      //         console.error(err);
      //         console.log(data);
      //       }
      //     );
      //   }
      // }

      await this.galleryModel.deleteOne({
        _id: args.galleryId,
        userId: user.sub,
      });

      return true;
    } catch {
      return false;
    }
  }

  async findAll(user: JwtPayload): Promise<GalleryList[]> {
    const blogs = await this.blogModel.find({
      userId: user.sub,
    });

    const galleries = await this.galleryModel.find({
      userId: user.sub,
    });

    // const blogNames = blogs.map((_) => {
    //   return {
    //     name: _.title,
    //     id: _.id,
    //     description: _.description,
    //     blog: true,
    //   };
    // });
    const galleryNames = galleries.map((_) => {
      return {
        name: _.name,
        id: _.id,
        description: _.description,
        images: _.images,
      };
    });

    const galleryList: GalleryList[] = [...galleryNames];

    galleryList.sort((a, b) => a.name.localeCompare(b.name));

    return galleryList;
  }

  async findOne(user: JwtPayload, args: GalleryArgs): Promise<Gallery> {
    return await this.galleryModel.findOne({
      _id: args.galleryId,
      userId: user.sub,
    });
  }
}

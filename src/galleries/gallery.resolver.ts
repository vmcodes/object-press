import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, JwtPayload } from 'src/auth/dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { GalleryService } from './gallery.service';
import {
  CreateGallery,
  UpdateGallery,
  GalleryArgs,
  RemoveGalleryImage,
  AddGalleryImage,
} from './dto';
import { Gallery, GalleryList } from './model';

@Resolver((of) => Gallery)
@UseGuards(JwtAuthGuard)
export class GalleryResolver {
  constructor(private readonly galleryService: GalleryService) {}

  @Mutation((returns) => Boolean)
  async addGallery(
    @CurrentUser() user: JwtPayload,
    @Args('newGalleryData') newGalleryData: CreateGallery
  ) {
    return await this.galleryService.create(user, newGalleryData);
  }

  @Mutation((returns) => Boolean)
  async updateGallery(
    @CurrentUser() user: JwtPayload,
    @Args('updateGalleryData') updateGalleryData: UpdateGallery
  ) {
    return await this.galleryService.update(user, updateGalleryData);
  }

  @Mutation((returns) => Boolean)
  async addGalleryImage(
    @CurrentUser() user: JwtPayload,
    @Args('addGalleryImage') addImage: AddGalleryImage
  ) {
    return await this.galleryService.addGalleryImage(user, addImage);
  }

  @Mutation((returns) => Boolean)
  async removeGallery(
    @CurrentUser() user: JwtPayload,
    @Args() removeGallery: GalleryArgs
  ) {
    return await this.galleryService.delete(user, removeGallery);
  }

  @Mutation((returns) => Boolean)
  async removeGalleryImage(
    @CurrentUser() user: JwtPayload,
    @Args('removePostImage') removeImage: RemoveGalleryImage
  ) {
    return await this.galleryService.removeGalleryImage(user, removeImage);
  }

  @Query((returns) => Gallery)
  async getGallery(
    @CurrentUser() user: JwtPayload,
    @Args() getGallery: GalleryArgs
  ): Promise<Gallery> {
    return await this.galleryService.findOne(user, getGallery);
  }

  @Query((returns) => [GalleryList])
  async getGalleryList(
    @CurrentUser() user: JwtPayload
  ): Promise<GalleryList[]> {
    return await this.galleryService.findAll(user);
  }
}

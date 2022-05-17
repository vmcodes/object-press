import { MaxLength, IsMongoId, IsString, IsArray } from 'class-validator';
import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGallery {
  @Field()
  @MaxLength(50)
  name: string;

  @Field()
  @IsString()
  description: string;
}

@InputType()
export class UpdateGallery {
  @Field()
  @IsMongoId()
  galleryId: string;

  @Field()
  @MaxLength(50)
  name: string;

  @Field()
  @IsString()
  description: string;
}

@InputType()
export class AddGalleryImage {
  @Field()
  @IsMongoId()
  galleryId: string;

  @Field((type) => [String])
  @IsArray()
  images: string[];
}

@InputType()
export class RemoveGalleryImage {
  @Field()
  @IsMongoId()
  galleryId: string;

  @Field()
  @IsString()
  image: string;
}

@ArgsType()
export class GalleryArgs {
  @Field()
  @IsMongoId()
  galleryId: string;
}

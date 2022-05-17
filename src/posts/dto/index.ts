import {
  MaxLength,
  IsMongoId,
  IsBoolean,
  IsNotEmptyObject,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
class PostContent {
  @Field()
  @IsString()
  title: string;
  @Field()
  @IsString()
  publishAt: string;
  @Field()
  @IsString()
  @IsOptional()
  content?: string;
  @Field()
  @IsString()
  pageTitle: string;
  @Field()
  @IsString()
  slug: string;
  @Field()
  @IsString()
  @IsOptional()
  keywords?: string;
  @Field()
  @IsString()
  @IsOptional()
  description?: string;
  @Field((type) => [String])
  @IsArray()
  @IsOptional()
  images?: string[];
  @Field((type) => [String])
  @IsArray()
  @IsOptional()
  altTags?: string[];
}

@InputType()
export class CreatePost {
  @Field()
  @IsMongoId()
  appId: string;

  @Field()
  @IsNotEmptyObject()
  post: PostContent;

  @Field()
  @IsBoolean()
  active: boolean;
}

@InputType()
export class UpdatePost {
  @Field()
  @IsMongoId()
  postId: string;

  @Field()
  @IsNotEmptyObject()
  post: PostContent;

  @Field()
  @IsBoolean()
  active: boolean;
}

@InputType()
export class RemoveImage {
  @Field()
  @IsMongoId()
  postId: string;

  @Field()
  @IsNotEmptyObject()
  post: PostContent;

  @Field()
  @IsString()
  image: string;
}

@ArgsType()
export class SearchTitles {
  @Field()
  @IsString()
  @MaxLength(50)
  title: string;
}

@ArgsType()
export class PostArgs {
  @Field()
  @IsMongoId()
  postId: string;
}

@ArgsType()
export class BlogArgs {
  @Field()
  @IsMongoId()
  appId: string;
}

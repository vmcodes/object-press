import {
  MaxLength,
  IsMongoId,
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';
import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBlog {
  @Field()
  @MaxLength(50)
  title: string;

  @Field()
  @IsString()
  @IsOptional()
  hook?: string;

  @Field()
  @IsString()
  @IsOptional()
  description?: string;

  @Field()
  @IsBoolean()
  active: boolean;
}

@InputType()
export class UpdateBlog {
  @Field()
  @IsMongoId()
  appId: string;

  @Field()
  @MaxLength(50)
  title: string;

  @Field()
  @IsString()
  @IsOptional()
  hook?: string;

  @Field()
  @IsString()
  @IsOptional()
  description?: string;

  @Field()
  @IsBoolean()
  active: boolean;
}

@ArgsType()
export class BlogArgs {
  @Field()
  @IsMongoId()
  appId: string;
}

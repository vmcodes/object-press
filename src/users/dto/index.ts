import {
  MaxLength,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUser {
  @Field()
  @IsUUID()
  userId: string;

  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class UpdateUser {
  @Field()
  @MaxLength(50)
  username: string;

  @Field()
  @IsOptional()
  @MaxLength(50)
  firstName?: string;

  @Field()
  @IsOptional()
  @MaxLength(50)
  lastName?: string;

  @Field()
  @IsOptional()
  @MaxLength(50)
  company?: string;

  @Field()
  @IsOptional()
  @MaxLength(50)
  title?: string;

  @Field()
  @IsOptional()
  @MaxLength(50)
  country?: string;

  @Field()
  @IsOptional()
  @MaxLength(50)
  website?: string;

  @Field()
  @IsBoolean()
  notify: boolean;
}

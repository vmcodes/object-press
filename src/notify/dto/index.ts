import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsMongoId, IsString } from 'class-validator';

@InputType()
export class NotificationInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  content: string;

  @Field()
  @IsBoolean()
  email: boolean;
}

@InputType()
export class NotificationDelete {
  @Field()
  @IsMongoId()
  id: string;
}

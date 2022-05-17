import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  appId: string;

  @Prop({ required: true })
  userSecret: string;

  @Prop({ required: true })
  appSecret: string;

  @Prop({ required: true, type: Object })
  post: Object;

  @Prop({ required: true })
  active: boolean;

  @Prop({ required: true })
  createDate: string;

  @Prop({ required: true })
  modifiedDate: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

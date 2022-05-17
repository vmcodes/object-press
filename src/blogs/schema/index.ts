import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Blog extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  appSecret: string;

  @Prop({ required: true })
  userSecret: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  hook: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  active: boolean;

  @Prop({ required: true })
  createDate: string;

  @Prop({ required: true })
  modifiedDate: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Gallery extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false, type: Array })
  images: string[];

  @Prop({ required: true })
  createDate: string;

  @Prop({ required: true })
  modifiedDate: string;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);

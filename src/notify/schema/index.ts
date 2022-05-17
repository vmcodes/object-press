import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  email: boolean;

  @Prop({ required: true })
  createDate: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

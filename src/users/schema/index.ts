import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  username: string;

  @Prop({ required: false })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: false })
  company: string;

  @Prop({ required: false })
  title: string;

  @Prop({ required: false })
  country: string;

  @Prop({ required: false })
  website: string;

  @Prop({ required: true })
  notifications: boolean;

  @Prop({ required: true })
  createDate: string;

  @Prop({ required: true })
  modifiedDate: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

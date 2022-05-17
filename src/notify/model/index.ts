import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Notification {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  content: string;

  @Field({ nullable: false })
  email: boolean;

  @Field({ nullable: false })
  createDate: string;
}

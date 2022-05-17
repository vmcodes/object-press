import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Blog {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  hook: string;

  @Field({ nullable: false })
  description: string;

  @Field({ nullable: false })
  active: boolean;

  @Field({ nullable: false })
  appSecret: string;

  @Field({ nullable: false })
  userSecret: string;

  @Field({ nullable: false })
  createDate: string;
}

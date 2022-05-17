import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Content {
  @Field()
  title: string;
  @Field()
  publishAt: string;
  @Field()
  content?: string;
  @Field()
  pageTitle: string;
  @Field()
  slug: string;
  @Field()
  keywords?: string;
  @Field()
  description?: string;
  @Field((type) => [String])
  images?: string[];
  @Field((type) => [String])
  altTags?: string[];
}

@ObjectType()
export class Post {
  @Field({ nullable: false })
  _id: string;

  @Field({ nullable: false })
  appId: string;

  @Field({ nullable: false })
  post: Content;

  @Field({ nullable: false })
  active: boolean;

  @Field({ nullable: false })
  modifiedDate: string;

  @Field({ nullable: false })
  createDate: string;

  @Field({ nullable: false })
  appSecret: string;

  @Field({ nullable: false })
  userSecret: string;
}

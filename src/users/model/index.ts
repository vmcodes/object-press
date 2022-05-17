import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Months } from 'src/utils/postHistory';

@ObjectType()
export class User {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  email: string;

  @Field()
  username: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  company: string;

  @Field()
  title: string;

  @Field()
  country: string;

  @Field()
  website: string;

  @Field()
  notifications: boolean;
}

@ObjectType()
export class Metrics {
  @Field((type) => Int, { nullable: false })
  blogs: number;

  @Field((type) => Int, { nullable: false })
  pendingPosts: number;

  @Field((type) => Int, { nullable: false })
  activePosts: number;

  @Field((type) => Int, { nullable: false })
  images: number;

  @Field({ nullable: false })
  postHistory: Months;
}

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Gallery {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  description: string;

  @Field((type) => [String])
  images: string[];
}

@ObjectType()
export class GalleryList {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  description: string;

  @Field((type) => [String])
  images: string[];
}

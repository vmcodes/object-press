import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext, Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsMongoId, IsUUID } from 'class-validator';

@InputType()
export class LoginUser {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsUUID()
  userId: string;
}

@InputType()
export class JwtPayload {
  @Field()
  @IsMongoId()
  sub: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user.jwtPayload;
  }
);

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUser, UpdateUser } from './dto';
import { Metrics, User } from './model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { CurrentUser, JwtPayload } from 'src/auth/dto';

@Resolver((of) => User)
@UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => Boolean)
  async addUser(@Args('newUpdateData') newUserData: CreateUser) {
    return await this.userService.create(newUserData);
  }

  @Mutation((returns) => Boolean)
  async updateUser(
    @CurrentUser() user: JwtPayload,
    @Args('updateUserData') updateUserData: UpdateUser
  ) {
    return await this.userService.update(user, updateUserData);
  }

  @Query((returns) => User)
  async getUser(@CurrentUser() user: JwtPayload): Promise<User> {
    return await this.userService.findUser(user);
  }

  @Query((returns) => Metrics)
  async getMetrics(@CurrentUser() user: JwtPayload): Promise<Metrics> {
    return this.userService.getMetrics(user);
  }
}

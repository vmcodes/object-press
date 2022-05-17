import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CurrentUser, JwtPayload, LoginUser } from './dto';
import { JwtAuthGuard } from './guards';
import { JWT } from './model';

@Resolver((of) => JWT)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => JWT)
  async loginUser(
    @Args('loginUserData') loginUserData: LoginUser
  ): Promise<JWT> {
    return await this.authService.login(loginUserData);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => JWT)
  async validateUser(@CurrentUser() user: JwtPayload) {
    return await this.authService.validate(user);
  }
}

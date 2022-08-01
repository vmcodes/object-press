import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { JwtPayload, LoginUser } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(loginUser: LoginUser) {
    try {
      await this.userService.login(loginUser);
      const user = await this.userService.findOne(loginUser);

      const token = { sub: user.id };

      return { accessToken: this.jwtService.sign(token) };
    } catch {
      const user = await this.userService.create(loginUser);

      const token = { sub: user.id };

      return { accessToken: this.jwtService.sign(token) };
    }
  }

  async validate(jwtPayload: JwtPayload) {
    try {
      const user = await this.userService.findUser(jwtPayload);
      const token = { sub: user.id };

      return { accessToken: this.jwtService.sign(token) };
    } catch {
      throw new UnauthorizedException();
    }
  }
}

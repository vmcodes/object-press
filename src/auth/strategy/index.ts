import { UserService } from 'src/users/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { constants } from '../../constants';
import { JwtPayload } from '../dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: constants.secret,
    });
  }

  async validate(jwtPayload: JwtPayload) {
    const user = await this.userService.findUser(jwtPayload);

    if (user.email) {
      return { jwtPayload };
    } else {
      throw new UnauthorizedException();
    }
  }
}

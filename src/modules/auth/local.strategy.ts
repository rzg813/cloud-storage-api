import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string) {
    console.log('username: ', username);
    const user = await this.userService.findOneBy(username);
    if (!user) {
      throw new UnauthorizedException('没找到用户。');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('用户登录密码错误');
    }
    if (user.enabled === 1) {
      throw new UnauthorizedException('Forbidden,User Disabled');
    }
    if (user.locked === 1) {
      throw new UnauthorizedException('Forbidden,User Locked');
    }
    return user;
  }
}

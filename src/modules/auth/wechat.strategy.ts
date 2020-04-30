import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class WechatStrategy extends PassportStrategy(Strategy, 'wechat') {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'openid',
      passwordField: 'password',
    });
  }

  async validate(openid: string, password: string) {
    console.log('openid: ', openid);
    if (password !== 'zgren') {
      throw new UnauthorizedException('微信用户登录密码错误');
    }
    const user = await this.userService.findOneByOpenid(openid);
    if (!user) {
      throw new UnauthorizedException('没找到用户。');
    }
    return user;
  }
}

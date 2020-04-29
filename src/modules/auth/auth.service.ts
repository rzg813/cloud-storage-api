import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../../entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    console.log(username + pass);
    const user = await this.userService.findOneBy(username);
    console.log(user);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async validateUserByOpenid(openid: string): Promise<any> {
    return openid;
  }

  async login(user: any) {
    const payload = { username: user.loginName, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

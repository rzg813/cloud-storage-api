import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../entity/user.entity';
export class AuthDto {
  @ApiProperty({ required: false })
  loginName: string;
  @ApiProperty({ required: false })
  password: string;
  @ApiProperty({ required: false })
  openid: string;
  @ApiProperty({ required: false })
  mobile: string;
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false, title: '验证码' })
  code: string;
}

export class AuthUser {
  loginName: string;
  openid: string;
  avatar: string;
  mobile: string;
  email: string;
  nickname: string;
  sex: string;
  token: string;
  copyProperties(user: User, token: string): AuthUser {
    this.loginName = user.loginName;
    this.openid = user.openid;
    this.avatar = user.avatar;
    this.mobile = user.mobile;
    this.email = user.email;
    this.nickname = user.nickname;
    this.sex = user.sex;
    this.token = token;
    return this;
  }
}

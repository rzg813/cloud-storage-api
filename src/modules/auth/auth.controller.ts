import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthDto, AuthUser } from './auth.dto';
import { User } from '../../entity/user.entity';

@ApiTags('登录')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '用户登录' })
  @Post('login')
  async create(@Body() authDto: AuthDto): Promise<Record<string, any>> {
    const { loginName, password, mobile, email, code } = authDto;
    let keword = '';
    if (loginName) {
      // 判断图形验证码
      keword = loginName;
    } else if (mobile) {
      // 判断短信验证码
      keword = mobile;
    } else if (email) {
      // 判断邮箱验证码
      keword = email;
    }
    const user: User = await this.userService.findOneBy(keword);

    const token = 'aaaa';
    const authUser = new AuthUser().copyProperties(user, token);
    /* if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    } */
    if (user.password === password) {
      return authUser;
    }
    throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
  }
}

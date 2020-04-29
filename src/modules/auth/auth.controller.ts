import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { AuthDto, AuthUser } from './auth.dto';
import { User } from '../../entity/user.entity';

@ApiTags('登录')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '用户登录' })
  @Post('login')
  async create(@Body() authDto: AuthDto): Promise<Record<string, any>> {
    const { username, password, code } = authDto;
    // 验证码有效性检查
    if (code) {
      throw new HttpException(
        'Verification Code is Null',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const user = await this.authService.validateUser(username, password);
    console.log(user);
    if (user) {
      if (user.enabled === 1) {
        throw new HttpException(
          'Forbidden,User Disabled',
          HttpStatus.FORBIDDEN,
        );
      }
      if (user.locked === 1) {
        throw new HttpException('Forbidden,User Locked', HttpStatus.FORBIDDEN);
      }
      // 生成 AccessToken
      const { accessToken } = await this.authService.login(user);
      return new AuthUser().copyProperties(user, accessToken);
    }
    throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
  }
}
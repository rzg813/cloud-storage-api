import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import svgCaptcha = require('svg-captcha');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('captcha')
  verification(@Req() req, @Res() res): void {
    const options = {
      size: 4, // 验证码长度/ 验证码字符中排除 0o1i
      noise: 5, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#c0c4cc', // 验证码图片背景颜色
    };
    const captcha = svgCaptcha.create(options);
    //req.session.captcha = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { query } from 'express';

@Injectable()
export class GlobalGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    // 如果存在验证码code，则先验证code有效性
    console.log(req.body);
    const { code } = req.body;
    if (code) {
      //按规则从redis中获取code
      const redisCode = 'zgren';
      if (redisCode !== code) {
        throw new HttpException('验证码错误', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    console.log('进入全局拦截，当前请求地址：' + req.path);
    if (this.hasUrl(this.urlList, req.path)) {
      return true;
    }
    // 过滤不带token的请求，直接返回非法请求
    const token = req.headers.authorization;
    if (!token) {
      throw new HttpException('非法请求', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return true;
  }

  // 白名单数组
  private urlList: string[] = [
    '/user/login',
    '/auth/login',
    '/auth/loginx',
    '/auth/weixin',
    '/captcha',
  ];

  // 验证该次请求是否为白名单内的路由
  private hasUrl(urlList: string[], url: string): boolean {
    let flag = false;
    if (urlList.indexOf(url) >= 0) {
      flag = true;
    }
    console.log('flag: ' + flag);
    return flag;
  }
}

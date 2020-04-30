import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log('进入全局拦截，当前请求地址：' + req.path);
    if (req.path === '/auth/login' || req.path === '/auth/weixin') {
      return true;
    }
    // 过滤不带token的请求，直接返回非法请求
    const token = req.headers.authorization;
    if (!token) {
      throw new HttpException('非法请求', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return true;
  }
}

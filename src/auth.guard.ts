import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as request from 'supertest';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.path);
    if (req.path === '/login') {
      return true;
    }
    console.log(req.headers);
    console.log(req.headers.authorization);
    //req.user = user;
    return true;
  }
}

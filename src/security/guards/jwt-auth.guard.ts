/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutionContext, ForbiddenException, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { isEmpty } from 'lodash';
import { HttpCodeError } from '../../core/utils';
import { APP_CONFIG } from 'src/configs/app.config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: any) {
    if (err) throw new UnauthorizedException({ message: HttpCodeError.REQUEST_ERRORS['401'].message, statusCode: 401 });
    console.log(user);
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const allowAnonymous = this.reflector.get<string[]>('allowAnonymous', context.getHandler());
    const allowSecret = this.reflector.get<string[]>('allowSecret', context.getHandler());
    const allowClientSecret = this.reflector.get<string[]>('allowClientSecret', context.getHandler());

    if (allowAnonymous) {
      return user;
    }

    // verify client secret
    if (allowClientSecret) {
      const secretKeyFromRequest = request?.headers['client-secret-keys'] || '';
      if (isEmpty(secretKeyFromRequest)) throw new UnauthorizedException({ message: HttpCodeError.REQUEST_ERRORS['401'].message, statusCode: 401 });
      const clientSecretKeys = APP_CONFIG.ENV.CLIENT_SECRET_KEY;
      if (secretKeyFromRequest !== clientSecretKeys) {
        throw new UnauthorizedException({ message: HttpCodeError.REQUEST_ERRORS['401'].message, statusCode: 401 });
      }
      return {};
    }
    if (!user || !roles) throw new UnauthorizedException({ message: HttpCodeError.REQUEST_ERRORS['401'].message, statusCode: 401 });
    if (!roles.includes(user.role)) throw new NotAcceptableException({ message: HttpCodeError.REQUEST_ERRORS['406'].message, statusCode: 406 });
    return user;
  }
}

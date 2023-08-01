import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { APP_CONFIG } from '../../configs/app.config';
import { Role } from '../../core/enum/role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: APP_CONFIG.ENV.SECURE.JWT.JWT_SECRET,
    });
  }

  async validate(payload: { deviceId: string; userId: number; role: Role }) {
    if (!payload.deviceId || !payload.userId || !payload.role) {
      throw new UnauthorizedException();
    }
    return {
      userId: payload.userId,
      deviceId: payload.deviceId,
      role: payload.role,
    };
  }
}

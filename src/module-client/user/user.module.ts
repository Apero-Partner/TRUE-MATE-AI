import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_CONFIG } from '../../configs/app.config';
import { JwtStrategy } from '../../security/guards';
import { User } from '../../core/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: APP_CONFIG.ENV.SECURE.JWT.JWT_SECRET,
      signOptions: { expiresIn: APP_CONFIG.ENV.SECURE.JWT.EXPIRE },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModuleAdmin {}

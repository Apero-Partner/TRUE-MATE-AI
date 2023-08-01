import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { APP_CONFIG } from '../../configs/app.config';
import { JwtStrategy } from '../../security/guards';
import { Character } from '../../core/entity/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  controllers: [CharacterController],
  providers: [CharacterService],
  exports: [CharacterService],
})
export class CharacterModuleAdmin {}

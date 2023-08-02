import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { APP_CONFIG } from '../../configs/app.config';
import { JwtStrategy } from '../../security/guards';
import { Conversation } from '../../core/entity/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation])],
  controllers: [ConversationController],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModuleAdmin {}

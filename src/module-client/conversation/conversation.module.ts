import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { Conversation } from '../../core/entity/conversation.entity';
import { UserModuleAdmin } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation]), UserModuleAdmin],
  controllers: [ConversationController],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModuleAdmin {}

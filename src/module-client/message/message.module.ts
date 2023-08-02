import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message } from '../../core/entity/message.entity';
import { ConversationModuleAdmin } from '../conversation/conversation.module';
import { ConversationService } from '../conversation/conversation.service';
import { OpenAiModuleAdmin } from '../open-ai/open-ai.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), ConversationModuleAdmin, OpenAiModuleAdmin],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModuleAdmin {}

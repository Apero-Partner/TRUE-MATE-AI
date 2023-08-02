import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, DataSource } from 'typeorm';

import { APP_CONFIG } from '../../configs/app.config';
import { ResponseError } from './message.enum';
import { Message } from '../../core/entity/message.entity';
import { Role } from '../../core/enum/role.enum';
import { JoinsModel, ParamsQueryModel } from './model/message.interface.model';
import { CurrentUserModel } from '../../core/model/current-user.model';
import { UserService } from '../user/user.service';
import { PaginationOptionsModel } from '../../core/model/pagination-options.model';
import { ConversationService } from '../conversation/conversation.service';
import { OpenAiService } from '../open-ai/open-ai.service';
import { CreateMesssageDTO } from './model/message.dto';
import { TypeMessage } from 'src/core/enum';

@Injectable()
export class MessageService {
  logger = new Logger('Message Service');
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private conversationService: ConversationService,
    private dataSource: DataSource,
    private openAiService: OpenAiService,
  ) {}

  async findAll(params?: ParamsQueryModel, joins?: JoinsModel, options?: PaginationOptionsModel) {
    const queryBuild = this.messageRepository.createQueryBuilder('message');
    queryBuild.where('message.isDeleted = false');
    if (params?.userId) {
      // check có đúng conversation của user đó không?
      await this.conversationService.findOneByFields({ userId: params.userId, id: params.conversationId }, { isThrowErrorIfNotExist: true });
    }
    if (params?.conversationId) {
      queryBuild.andWhere('message.conversationId = :conversationId', { conversationId: params?.conversationId });
    }
    if (options?.sort && options?.sort.length > 0) {
      for (const param of options.sort) {
        queryBuild.addOrderBy(`message.${param.property}`, param.order);
      }
    }
    if (options?.skip) {
      queryBuild.skip(options.skip);
    }
    if (options?.take) {
      queryBuild.take(options.take);
    }
    const result = await queryBuild.getManyAndCount();
    return result;
  }

/*   async findOneByFields(params: ParamsQueryModel, options: { isThrowErrorIfNotExist: boolean }) {
    const queryBuild = this.messageRepository.createQueryBuilder('message');
    queryBuild.where('message.isDeleted = false');
    if (params?.id) {
      queryBuild.andWhere('message.id = :id', { id: params?.id });
    }
    const result = await queryBuild.getOne();
    if (options.isThrowErrorIfNotExist) {
      if (!result) throw new BadRequestException(ResponseError.ERROR_MESSAGE_NOT_FOUND);
    }

    return result;
  } */

  async create(inforUser: CurrentUserModel, body: CreateMesssageDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 1. check xem có conversation không ứng với user ID đó không?
      const conversation = await this.conversationService.findOneByFields(
        { userId: inforUser.userId, id: body.conversationId },
        { isThrowErrorIfNotExist: true },
      );

      //3. get 6 tin nhắn cuối cùng
      const [sixLastMessages] = await this.findAll(
        { conversationId: conversation.id },
        {},
        { skip: 0, take: 6, sort: [{ property: 'createdAt', order: 'ASC' }] },
      );

      // 4. parse các tin nhắn thành cuộc hội thoại
      const parse = this.parseMessagesToConversation(sixLastMessages, body.text);

      //  5. call open ai
      const responseFromOpenAi = await this.openAiService.AskByText(parse);

      // 6. insert message của bot + người dùng

      const entityFromUser = queryRunner.manager.getRepository(Message).create({ type: TypeMessage.USER, content: body.text, conversation });
      const resultFromUser = await queryRunner.manager.getRepository(Message).save(entityFromUser);

      const entityFromBot = queryRunner.manager.getRepository(Message).create({ type: TypeMessage.BOT, content: responseFromOpenAi, conversation });
      const resultFromBot = await queryRunner.manager.getRepository(Message).save(entityFromBot);

      await queryRunner.commitTransaction();
      return {
        bot: resultFromBot,
        user: resultFromUser,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private parseMessagesToConversation(messages: Message[], question: string) {
    const listMessages = messages.map((el) => el.content);
    listMessages.push(question);
    const result = listMessages.join(' \n ');
    return result;
  }
}

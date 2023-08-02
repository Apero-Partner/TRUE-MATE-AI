import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { APP_CONFIG } from '../../configs/app.config';
import { ResponseError } from './conversation.enum';
import { Conversation } from '../../core/entity/conversation.entity';
import { Role } from '../../core/enum/role.enum';
import { ParamsQueryModel } from './model/conversation.interface.model';
import { CurrentUserModel } from '../../core/model/current-user.model';

@Injectable()
export class ConversationService {
  logger = new Logger('Conversation Service');
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async findOneByFields(params: ParamsQueryModel, options: { isThrowErrorIfNotExist: boolean }) {
    const queryBuild = this.conversationRepository.createQueryBuilder('conversation');
    queryBuild.where('conversation.isDeleted = false');
    /*     if (params?.id) {
      queryBuild.andWhere('conversation.id = :id', { id: params?.id });
    }
    if (params?.deviceId) {
      queryBuild.andWhere('conversation.deviceId = :deviceId', { deviceId: params?.deviceId });
    } */
    const result = await queryBuild.getOne();
    if (options.isThrowErrorIfNotExist === true) {
      if (!result) throw new BadRequestException(ResponseError.ERROR_CONVERSATION_NOT_FOUND);
    }

    return result;
  }

  async create(inforUser: CurrentUserModel) {
    const create = this.conversationRepository.create({});
    const result = await this.conversationRepository.save(create);
    console.log(result);
    return result;
  }
}

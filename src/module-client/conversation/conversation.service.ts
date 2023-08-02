import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { APP_CONFIG } from '../../configs/app.config';
import { ResponseError } from './conversation.enum';
import { Conversation } from '../../core/entity/conversation.entity';
import { Role } from '../../core/enum/role.enum';
import { JoinsModel, ParamsQueryModel } from './model/conversation.interface.model';
import { CurrentUserModel } from '../../core/model/current-user.model';
import { UserService } from '../user/user.service';
import { PaginationOptionsModel } from '../../core/model/pagination-options.model';

@Injectable()
export class ConversationService {
  logger = new Logger('Conversation Service');
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    private userService: UserService,
  ) {}

  async findAll(params?: ParamsQueryModel, joins?: JoinsModel, options?: PaginationOptionsModel) {
    const queryBuild = this.conversationRepository.createQueryBuilder('conversation');
    queryBuild.where('conversation.isDeleted = false');
    if (params?.id) {
      queryBuild.andWhere('conversation.id = :id', { id: params?.id });
    }
    if (params?.lastMessage) {
      queryBuild.andWhere('conversation.lastMessage ILIKE :lastMessage', { lastMessage: `%${params?.lastMessage}%` });
    }
    if (params?.userId) {
      queryBuild.andWhere('conversation.userId = :userId', { userId: params?.userId });
    }
    if (options?.sort && options?.sort.length > 0) {
      for (const param of options.sort) {
        queryBuild.addOrderBy(`conversation.${param.property}`, param.order);
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

  async findOneByFields(params: ParamsQueryModel, options: { isThrowErrorIfNotExist: boolean }) {
    const queryBuild = this.conversationRepository.createQueryBuilder('conversation');
    queryBuild.where('conversation.isDeleted = false');
    if (params?.id) {
      queryBuild.andWhere('conversation.id = :id', { id: params?.id });
    }
    if (params?.userId) {
      queryBuild.andWhere('conversation.userId = :userId', { userId: params?.userId });
    }
    const result = await queryBuild.getOne();
    if (options.isThrowErrorIfNotExist) {
      if (!result) throw new BadRequestException(ResponseError.ERROR_CONVERSATION_NOT_FOUND);
    }

    return result;
  }

  async create(inforUser: CurrentUserModel) {
    const user = await this.userService.findOneByFields({ id: inforUser.userId }, { isThrowErrorIfNotExist: true });
    const entity = this.conversationRepository.create({ user });
    const result = await this.conversationRepository.save(entity);
    return result;
  }
}

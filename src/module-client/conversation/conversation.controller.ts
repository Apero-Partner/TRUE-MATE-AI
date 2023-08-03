import { Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { AuthticateGuard } from '../../security/guards';
import { Role } from '../../core/enum';
import { APP_CONFIG } from '../../configs/app.config';
import { CurrentUser } from '../../decorators';
import { CurrentUserModel } from '../../core/model/current-user.model';
import { getAllConversationsDTO } from './model/conversation.dto';
import { PageRequest } from '../../core/model/base/pagination.model';
import { JoinsModel, ParamsQueryModel } from './model/conversation.interface.model';
import { convertPaginate } from '../../common';

@Controller(`/api/${APP_CONFIG.ENV.VERSION}/conversation`)
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Get('/')
  @AuthticateGuard({
    roles: [Role.ANONYMOUS],
  })
  async getAll(@CurrentUser() inforUser: CurrentUserModel, @Query() query: getAllConversationsDTO) {
    const pageRequest: PageRequest = new PageRequest(
      query.page,
      query.pageSize,
      query.sort || 'createdAt,ASC', //DESC or ASC
    );
    const joinTable: JoinsModel = {};
    const paramsQuery: ParamsQueryModel = {
      userId: inforUser.userId,
      lastMessage: query.lastMessage,
    };
    const [result, total] = await this.conversationService.findAll(paramsQuery, joinTable, pageRequest);
    const response = convertPaginate(result, pageRequest, total);
    return response;
  }

  @Get('/:id')
  @AuthticateGuard({
    roles: [Role.ANONYMOUS],
  })
  async getId(@CurrentUser() inforUser: CurrentUserModel, @Param('id', ParseUUIDPipe) id: string) {
    const user = await this.conversationService.findOneByFields({ id, userId: inforUser.userId }, { isThrowErrorIfNotExist: true });
    return user;
  }

  @Post('/create')
  @AuthticateGuard({
    roles: [Role.ANONYMOUS],
  })
  async post(@CurrentUser() inforUser: CurrentUserModel) {
    const create = await this.conversationService.create(inforUser);
    return create;
  }
}

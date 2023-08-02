import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthticateGuard } from '../../security/guards';
import { Role } from '../../core/enum';
import { APP_CONFIG } from '../../configs/app.config';
import { CurrentUser } from '../../decorators';
import { CurrentUserModel } from '../../core/model/current-user.model';
import { CreateMesssageDTO, getAllMessagesDTO } from './model/message.dto';
import { PageRequest } from '../../core/model/base/pagination.model';
import { JoinsModel, ParamsQueryModel } from './model/message.interface.model';
import { convertPaginate } from '../../common';

@Controller(`/api/${APP_CONFIG.ENV.VERSION}/message`)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('/')
  @AuthticateGuard({
    roles: [Role.ANONYMOUS],
  })
  async getAll(@CurrentUser() inforUser: CurrentUserModel, @Query() query: getAllMessagesDTO) {
    const pageRequest: PageRequest = new PageRequest(
      query.page,
      query.pageSize,
      query.sort || 'createdAt,ASC', //DESC or ASC
    );
    const joinTable: JoinsModel = {};
    const paramsQuery: ParamsQueryModel = {
      conversationId: query.conversationId,
      userId: inforUser.userId,
    };
    const [result, total] = await this.messageService.findAll(paramsQuery, joinTable, pageRequest);
    const response = convertPaginate(result, pageRequest, total);
    return response;
  }

  @Post('/create')
  @AuthticateGuard({
    roles: [Role.ANONYMOUS],
  })
  async post(@CurrentUser() inforUser: CurrentUserModel, @Body() body: CreateMesssageDTO) {
    console.log(inforUser);
    const create = await this.messageService.create(inforUser, body);
    return create;
  }
}

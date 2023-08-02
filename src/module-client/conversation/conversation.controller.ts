import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { AuthticateGuard } from '../../security/guards';
import { Role } from '../../core/enum';
import { APP_CONFIG } from '../../configs/app.config';
import { CurrentUser } from '../../decorators';
import { CurrentUserModel } from '../../core/model/current-user.model';

@Controller(`/api/${APP_CONFIG.ENV.VERSION}/conversation`)
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Get('/:id')
  @AuthticateGuard({
    roles: [Role.ANONYMOUS],
  })
  async getId(@CurrentUser() inforUser: any, @Param('id') id: string) {
    console.log(inforUser);
    const user = await this.conversationService.findOneByFields({ id: Number(id) }, { isThrowErrorIfNotExist: true });
    return user;
  }

  @Post('/create')
  @AuthticateGuard({
    roles: [Role.ANONYMOUS],
  })
  async post(@CurrentUser() inforUser: CurrentUserModel) {
    console.log(inforUser);
    const create = await this.conversationService.create(inforUser);
    return create;
  }
}

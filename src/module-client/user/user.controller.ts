import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDTO } from './model/user.dto';
import { AuthticateGuard } from '../../security/guards';
import { Role } from '../../core/enum';
import { APP_CONFIG } from '../../configs/app.config';
import { CurrentUserModel } from 'src/core/model/current-user.model';
import { CurrentUser } from 'src/decorators';

@Controller(`/api/${APP_CONFIG.ENV.VERSION}/user`)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/get-me')
  @AuthticateGuard({
    roles: [Role.ANONYMOUS],
  })
  async getId(@CurrentUser() inforUser: CurrentUserModel) {
    const user = await this.userService.findOneByFields({ id: inforUser.userId }, { isThrowErrorIfNotExist: true });
    return user;
  }

  @Post('/register')
  async post(@Body() body: RegisterUserDTO) {
    const create = await this.userService.register(body);
    return create;
  }
}

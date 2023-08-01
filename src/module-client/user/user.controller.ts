import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDTO } from './model/user.dto';
import { AuthticateGuard } from '../../security/guards';
import { Role } from '../../core/enum';
import { APP_CONFIG } from '../../configs/app.config';

@Controller(`/api/${APP_CONFIG.ENV.VERSION}/user`)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  @AuthticateGuard({
    roles: [Role.ANONYMOUS],
  })
  async getId(@Query('user') value: string, @Param('id') id: string) {
    console.log(value);
    const user = await this.userService.findOneByFields({ id: Number(id) }, { isThrowErrorIfNotExist: true });
    return user;
  }

  @Post('/register')
  async post(@Body() body: RegisterUserDTO) {
    const create = await this.userService.register(body);
    return create;
  }

  @Put('/:id/change-active')
  async changeActive() {
    return 1;
  }
}

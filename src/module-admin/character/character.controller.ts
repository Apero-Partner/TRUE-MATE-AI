import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';

import { CharacterService } from './character.service';
import { CreateCharacterDTO, getAllCharacterDTO } from './model/character.dto';
import { AuthticateGuard } from '../../security/guards';
import { Role } from '../../core/enum';
import { APP_CONFIG } from '../../configs/app.config';
import { PageRequest } from 'src/core/model/base/pagination.model';
import { convertPaginate } from 'src/common/convert-paginate.common';
import { JoinsModel, ParamsQueryModel } from './model/character.interface.model';

@Controller(`/api/${APP_CONFIG.ENV.VERSION}/character`)
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Get('/')
  async getAll(@Query() query: getAllCharacterDTO) {
    const pageRequest: PageRequest = new PageRequest(
      query.page,
      query.pageSize,
      query.sort || 'createdAt,ASC', //DESC or ASC
    );
    const paramsPaginate: any = {
      skip: pageRequest.page > 1 ? (pageRequest.page - 1) * pageRequest.size : 0,
      take: +pageRequest.size,
      sort: pageRequest.sort,
    };
    const joinTable: JoinsModel = {};
    const paramsQuery: ParamsQueryModel = {
      name: query.name,
      gender: query.gender,
    };
    console.log('paramsquery', paramsQuery);
    const [result, total] = await this.characterService.findAll(paramsQuery, joinTable, paramsPaginate);
    const response = convertPaginate(result, pageRequest, total);
    return response;
  }

  @Get('/:id')
  @AuthticateGuard({
    roles: [Role.CUSTOMER],
  })
  async getId() {
    return 1;
  }

  @Post('/create')
  async create(@Body() body: CreateCharacterDTO) {
    const create = await this.characterService.create(body);
    console.log(body);
    return create;
  }

  @Put('/:id/change-active')
  async changeActive() {
    return 1;
  }
}

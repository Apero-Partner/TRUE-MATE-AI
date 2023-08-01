import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Character } from '../../core/entity/character.entity';
import { CreateCharacterDTO } from './model/character.dto';
import { JoinsModel, PaginationOptionsModel, ParamsQueryModel } from './model/character.interface.model';
import { ResponseError } from './character.enum';

@Injectable()
export class CharacterService {
  logger = new Logger('Character Service');
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async findAll(params?: ParamsQueryModel, joins?: JoinsModel, options?: PaginationOptionsModel) {
    try {
      const queryBuild = this.characterRepository.createQueryBuilder('character');
      queryBuild.where('character.isDeleted = false');
      if (params?.id) {
        queryBuild.andWhere('character.id = :status', { id: params?.id });
      }
      if (params?.name) {
        queryBuild.andWhere('character.name ILIKE :name', { name: `%${params?.name}%` });
      }
      if (params?.gender) {
        queryBuild.andWhere('character.gender = :gender', { gender: params?.gender });
      }
      if (options?.sort && options?.sort.length > 0) {
        for (const param of options.sort) {
          queryBuild.addOrderBy(`character.${param.property}`, param.order);
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
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async findOneByFields(params: ParamsQueryModel, options: { isThrowErrorIfNotExist: boolean }) {
    const queryBuild = this.characterRepository.createQueryBuilder('character');
    queryBuild.where('character.isDeleted = false');
    if (params?.id) {
      queryBuild.andWhere('character.id = :id', { id: params?.id });
    }
    if (params?.name) {
      queryBuild.andWhere('character.name = :name', { name: params?.name });
    }
    const result = await queryBuild.getOne();
    if (options.isThrowErrorIfNotExist === true) {
      if (!result) throw new BadRequestException(ResponseError.ERROR_CHARACTER_NOT_FOUND);
    }

    return result;
  }

  async create(body: CreateCharacterDTO) {
    const find = await this.findOneByFields({ name: body.name }, { isThrowErrorIfNotExist: false });
    if (find) {
      throw new BadRequestException(ResponseError.ERROR_NAME_ALREADY_EXISTS);
    }
    const entity = this.characterRepository.create(body);
    await this.characterRepository.insert(entity);
    return {
      statusCode: 201,
      message: 'create success',
    };
  }
}

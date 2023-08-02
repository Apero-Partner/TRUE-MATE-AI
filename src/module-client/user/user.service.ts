import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { APP_CONFIG } from '../../configs/app.config';
import { ResponseError } from './user.enum';
import { User } from '../../core/entity/user.entity';
import { RegisterUserDTO } from './model/user.dto';
import { ParamsQueryModel } from './model/user.interface.model';
import { Role } from '../../core/enum/role.enum';

@Injectable()
export class UserService {
  logger = new Logger('User Service');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findOneByFields(params: ParamsQueryModel, options: { isThrowErrorIfNotExist: boolean }) {
    const queryBuild = this.userRepository.createQueryBuilder('user');
    queryBuild.where('user.isDeleted = false');
    if (params?.id) {
      queryBuild.andWhere('user.id = :id', { id: params?.id });
    }
    if (params?.deviceId) {
      queryBuild.andWhere('user.deviceId = :deviceId', { deviceId: params?.deviceId });
    }
    if (params?.isActive) {
      queryBuild.andWhere('user.isActive = :isActive', { isActive: params?.isActive });
    }
    const result = await queryBuild.getOne();
    if (options.isThrowErrorIfNotExist === true) {
      if (!result) throw new BadRequestException(ResponseError.ERROR_USER_NOT_FOUND);
    }

    return result;
  }

  async register(body: RegisterUserDTO) {
    const user = await this.findOneByFields({ deviceId: body.deviceId }, { isThrowErrorIfNotExist: false });
    if (user) {
      const token = this.signToken({ deviceId: user.deviceId, userId: user.id, role: user.role });
      return { token };
    }
    const create = this.userRepository.create(body);
    const result = await this.userRepository.save(create);
    const token = this.signToken({ deviceId: result.deviceId, userId: result.id, role: result.role });

    return { token };
  }

  signToken(payload: { deviceId: string; userId: number; role: Role }) {
    const token = this.jwtService.sign(payload, {
      secret: APP_CONFIG.ENV.SECURE.JWT.JWT_SECRET,
      expiresIn: APP_CONFIG.ENV.SECURE.JWT.EXPIRE,
      algorithm: 'HS512',
    });
    return token;
  }
}

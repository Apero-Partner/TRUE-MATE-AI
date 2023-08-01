import { Expose, Transform } from 'class-transformer';
import { Gender } from '../../../core/enum/gender.enum';
import { Role } from '../../../core/enum/role.enum';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class ChangeActiveCharacterDTO {
  @IsBoolean()
  isActive: boolean;
}

export class CreateCharacterDTO {
  @IsNotEmpty({ message: 'Must have coin' })
  coin: number;

  @IsNotEmpty({ message: 'Must have name' })
  name: string;

  @IsNotEmpty({ message: 'Must have description' })
  description: string;

  @IsOptional()
  thumbnail: string;

  @IsNumber()
  @IsOptional()
  totalConversations: number;

  @IsEnum(Gender, { message: 'Invalid gender' })
  gender: Gender;
}

export class getAllCharacterDTO {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEnum(Gender, { message: 'Invalid gender (female or male)' })
  gender?: string;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  id?: number;

  @IsOptional()
  page?: string;

  @IsOptional()
  pageSize?: string;

  @IsOptional()
  sort?: {
    property: string;
    order: 'ASC' | 'DESC';
  };
}

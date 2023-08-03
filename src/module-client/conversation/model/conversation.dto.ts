import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class getAllConversationsDTO {
  @IsOptional()
  lastMessage?: string;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  isDeleted?: boolean;

  @IsOptional()
  id?: string;

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

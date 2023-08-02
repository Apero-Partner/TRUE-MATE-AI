import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class getAllMessagesDTO {
  @IsNotEmpty({ message: 'Must have conversation ID' })
  conversationId?: number;

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

export class CreateMesssageDTO {
  @IsString()
  text: string;

  @IsNumber()
  conversationId: number;
}

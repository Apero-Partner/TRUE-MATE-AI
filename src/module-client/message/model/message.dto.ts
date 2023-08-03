import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class getAllMessagesDTO {
  @IsNotEmpty({ message: 'Must have conversation ID' })
  conversationId?: string;

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
  conversationId: string;
}

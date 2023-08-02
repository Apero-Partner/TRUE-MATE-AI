import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Conversation } from './conversation.entity';
import { TypeMessage } from '../enum';

@Entity('message')
export class Message extends BaseEntity {
  @Column({ nullable: false, type: 'text' })
  content: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ nullable: false, type: 'enum', enum: TypeMessage })
  type: TypeMessage;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages, { nullable: false })
  conversation: Conversation;
}

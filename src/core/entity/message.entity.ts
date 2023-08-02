import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Conversation } from './conversation.entity';

@Entity('message')
export class Message extends BaseEntity {
  @Column({ nullable: false, type: 'text' })
  lastMessage: string;

  @Column({ type: 'boolean', default: false })
  isPin: boolean;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages, { nullable: false })
  conversation: Conversation;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}

import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity('conversation')
export class Conversation extends BaseEntity {
  @ManyToOne(() => User, (user) => user.conversations, { nullable: false })
  user: User;

  @Column({ nullable: false, type: 'text', default: '' })
  lastMessage: string;

  @Column({ type: 'boolean', default: false })
  isPin: boolean;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}

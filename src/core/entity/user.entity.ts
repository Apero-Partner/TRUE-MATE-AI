import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Role } from '../enum';
import { Conversation } from './conversation.entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({ nullable: false, type: 'text', unique: true })
  deviceId: string;

  @Column({ nullable: false, type: 'enum', enum: Role, default: Role.ANONYMOUS })
  role: Role;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversations: Conversation[];
}

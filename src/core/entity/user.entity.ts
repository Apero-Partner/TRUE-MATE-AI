import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Role } from '../enum';

@Entity('user')
export class User extends BaseEntity {
  @Column({ nullable: false, type: 'text' })
  deviceId: string;

  @Column({ nullable: false, type: 'int', default: 0 })
  coin: number;

  @Column({ nullable: false, type: 'int', default: 10 })
  chatRemaining: string;

  @Column({ nullable: true, type: 'date', default: null })
  vipUntil: Date;

  @Column({ nullable: false, type: 'enum', enum: Role, default: Role.ANONYMOUS })
  role: Role;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}

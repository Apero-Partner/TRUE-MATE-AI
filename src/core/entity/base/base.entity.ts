import { CreateDateColumn, Generated, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
  /*   @Column({ nullable: true })
  createdBy?: string;
  @Column({ nullable: true })
  createdDate?: Date;
  @Column({ nullable: true })
  lastModifiedBy?: string;
  @Column({ nullable: true })
  lastModifiedDate?: Date; */
}

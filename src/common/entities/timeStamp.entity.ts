import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TimeStamp {
  @CreateDateColumn()
  readonly createdAt: Date;
  @UpdateDateColumn()
  readonly updatedAt: Date;
}

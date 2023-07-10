import { TimeStamp } from 'src/common/entities/timeStamp.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post extends TimeStamp {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  body: string;

  @ManyToOne(() => User)
  createdBy: User;

  constructor(body: string, createdBy: User) {
    super();
    this.body = body;
    this.createdBy = createdBy;
  }
}

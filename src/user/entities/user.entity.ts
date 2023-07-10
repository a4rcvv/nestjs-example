import { TimeStamp } from 'src/common/entities/timeStamp.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends TimeStamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  passwordHash: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  constructor(email: string, username: string, passwordHash: string) {
    super();
    this.email = email;
    this.username = username;
    this.passwordHash = passwordHash;
  }
}

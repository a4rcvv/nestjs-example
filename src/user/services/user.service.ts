import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async create(
    email: string,
    username: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(email, username, hashedPassword);
    return await this.userRepository.save(user);
  }
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}

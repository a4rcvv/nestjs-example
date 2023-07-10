import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }
  async create(body: string, createdBy: User): Promise<Post> {
    const post = new Post(body, createdBy);
    return await this.postRepository.save(post);
  }
  async remove(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from 'src/post/post.dto';
import { PostService } from 'src/post/services/post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.findAll();
  }

  @Post()
  createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto.body, req.user);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}

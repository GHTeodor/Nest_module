import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll(): PostDto[] {
    return this.postService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getOneById(@Param('id') id: number): PostDto {
    return this.postService.getOneById(+id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() postDto: PostDto): PostDto {
    return this.postService.create(postDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  update(@Param('id') id: number, @Body() postDto: PostDto): PostDto {
    return this.postService.updateById(+id, postDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.postService.deleteById(+id);
  }
}

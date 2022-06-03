import { Injectable } from '@nestjs/common';

import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  posts = [];

  getAll() {
    return this.posts;
  }

  getOneById(id: number) {
    return this.posts.find((post) => post.id === id);
  }

  create(postDto: PostDto) {
    this.posts.push({
      ...postDto,
      id: new Date().valueOf(),
    });
    return postDto;
  }

  updateById(id: number, postDto: PostDto) {
    const idx = this.posts.findIndex((user) => user.id === id);
    return (this.posts[idx] = { ...postDto, id: this.posts[idx].id });
  }

  deleteById(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    return this.posts.splice(postIndex, 1);
  }
}

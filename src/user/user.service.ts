import { Injectable } from '@nestjs/common';

import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  users = [];

  getAll() {
    return this.users;
  }

  getOneById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(userDto: UserDto) {
    this.users.push({
      ...userDto,
      id: new Date().valueOf(),
    });
    return userDto;
  }

  updateById(id: number, userDto: UserDto) {
    const idx = this.users.findIndex((user) => user.id === id);
    return (this.users[idx] = { ...userDto, id: this.users[idx].id });
  }

  deleteById(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    return this.users.splice(userIndex, 1);
  }
}

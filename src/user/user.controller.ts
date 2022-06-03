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

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll(): UserDto[] {
    return this.userService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getOneById(@Param('id') id: number) {
    return this.userService.getOneById(+id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  update(@Param('id') id: number, @Body() userDto: UserDto) {
    return this.userService.updateById(+id, userDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.userService.deleteById(+id);
  }
}

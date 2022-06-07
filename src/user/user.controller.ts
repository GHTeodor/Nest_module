import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get one user by id' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        email: 'example@gmail.com',
        name: 'Katya',
        city: 'New York',
        status: true,
        age: 30,
        password: 'superSecretP@SSw0rd',
        cars: [
          {
            id: 2,
            model: 'Tesla',
            color: 'red',
            country: 'USA',
            year: 2,
            isElectrocar: true,
            ownerId: 1,
          },
        ],
        cats: [
          {
            id: 2,
            name: 'Murkotusyk',
            color: 'silver',
            age: 1,
            petPassport: true,
            ownerId: 1,
          },
        ],
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneById(@Param('id') id: string) {
    return this.userService.getOneById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createOne(@Body() userDto: CreateUserDto) {
    return this.userService.createOne(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateOneById(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return this.userService.updateOneById(id, userData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.userService.deleteOneById(id);
  }
}

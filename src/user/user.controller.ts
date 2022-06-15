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
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { imageFileFilter } from '../utils/image.filter';

@ApiTags()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(AuthGuard)
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
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './avatar',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          return callback(null, `${randomName}${file.originalname}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  updateOneById(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    let newAvatarPath: string = null;
    try {
      if (avatar) {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        newAvatarPath = `avatar/${randomName}${avatar.originalname}`;
      }

      userData.avatar = newAvatarPath;
    } catch (e) {
      console.log(e);
    }
    return this.userService.updateOneById(id, userData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.userService.deleteOneById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('avatar/:image_path')
  watchFile(@Param('image_path') image, @Res() res) {
    return res.sendFile(image, { root: './avatar' });
  }
}

// const randomName = Array(32)
//   .fill(null)
//   .map(() => Math.round(Math.random() * 16).toString(16))
//   .join('');

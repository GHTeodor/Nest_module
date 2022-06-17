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
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { imageFileFilter } from '../utils/image.filter';

@ApiTags()
@Controller('cars')
export class CarController {
  private static randomName: string;

  constructor(private carService: CarService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.carService.getAll();
  }

  @ApiOperation({ summary: 'Get one car by id' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        model: 'Tesla',
        color: 'white',
        country: 'USA',
        year: 2022,
        isElectrocar: true,
        ownerId: 1,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneById(@Param('id') id: string) {
    return this.carService.getOneById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createOne(@Body() carDto: CreateCarDto) {
    return this.carService.createOne(carDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './test/avatar',
        filename: (req, file, callback) => {
          CarController.randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          return callback(
            null,
            `${CarController.randomName}${file.originalname}`,
          );
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  updateOneById(
    @Param('id') id: string,
    @Body() carData: UpdateCarDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    let newAvatar: string = null;
    try {
      if (avatar)
        newAvatar = `avatar/${CarController.randomName}${avatar.originalname}`;

      carData.avatar = newAvatar;
    } catch (e) {
      console.log(e);
    }

    return this.carService.updateOneById(id, carData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.carService.deleteOneById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('avatar/:image_path')
  watchFile(@Param('image_path') image, @Res() res) {
    return res.sendFile(image, { root: './test/avatar' });
  }
}

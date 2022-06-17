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

import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { imageFileFilter } from '../utils/image.filter';

@ApiTags()
@Controller('cats')
export class CatController {
  private static randomName: string;

  constructor(private catService: CatService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.catService.getAll();
  }

  @ApiOperation({ summary: 'Get one cat by id' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        name: 'AbrakaDuck',
        color: 'black-white-orange',
        age: 1,
        petPassport: true,
        ownerId: 1,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneById(@Param('id') id: string) {
    return this.catService.getOneById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createOne(@Body() catDto: CreateCatDto) {
    return this.catService.createOne(catDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './test/avatar',
        filename: (req, file, callback) => {
          CatController.randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          return callback(
            null,
            `${CatController.randomName}${file.originalname}`,
          );
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  updateOneById(
    @Param('id') id: string,
    @Body() catData: UpdateCatDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    let newAvatar: string = null;
    try {
      if (avatar)
        newAvatar = `avatar/${CatController.randomName}${avatar.originalname}`;

      catData.avatar = newAvatar;
    } catch (e) {
      console.log(e);
    }

    return this.catService.updateOneById(id, catData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.catService.deleteOneById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('avatar/:image_path')
  watchFile(@Param('image_path') image, @Res() res) {
    return res.sendFile(image, { root: './test/avatar' });
  }
}

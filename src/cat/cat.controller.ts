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

import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@ApiTags()
@Controller('cats')
export class CatController {
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
  updateOneById(@Param('id') id: string, @Body() catData: UpdateCatDto) {
    return this.catService.updateOneById(id, catData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.catService.deleteOneById(id);
  }
}

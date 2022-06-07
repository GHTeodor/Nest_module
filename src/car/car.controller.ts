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

import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@ApiTags()
@Controller('cars')
export class CarController {
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
  updateOneById(@Param('id') id: string, @Body() carData: UpdateCarDto) {
    return this.carService.updateOneById(id, carData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteOneById(@Param('id') id: string) {
    return this.carService.deleteOneById(id);
  }
}

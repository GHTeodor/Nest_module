import { Injectable } from '@nestjs/common';
import { Car, Prisma } from '@prisma/client';

import { PrismaService } from '../core/prisma.service';

@Injectable()
export class CarService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Car[]> {
    return this.prismaService.car.findMany({});
  }

  getOneById(carId: string): Promise<Car> {
    return this.prismaService.car.findUnique({
      where: { id: Number(carId) },
    });
  }

  createOne(data: Prisma.CarCreateInput): Promise<Car> {
    return this.prismaService.car.create({ data });
  }

  updateOneById(carId: string, carData: Prisma.CarUpdateInput): Promise<Car> {
    return this.prismaService.car.update({
      where: { id: Number(carId) },
      data: {
        color: carData.color,
        country: carData.country,
        year: carData.year,
        isElectrocar: carData.isElectrocar,
      },
    });
  }

  deleteOneById(carId: string): Promise<Car> {
    return this.prismaService.car.delete({ where: { id: Number(carId) } });
  }
}

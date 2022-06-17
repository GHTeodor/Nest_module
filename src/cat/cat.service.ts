import { Injectable } from '@nestjs/common';
import { Cat, Prisma } from '@prisma/client';

import { PrismaService } from '../core/prisma.service';

@Injectable()
export class CatService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Cat[]> {
    return this.prismaService.cat.findMany({});
  }

  getOneById(catId: string): Promise<Cat> {
    return this.prismaService.cat.findUnique({ where: { id: Number(catId) } });
  }

  createOne(data: Prisma.CatCreateInput): Promise<Cat> {
    return this.prismaService.cat.create({ data });
  }

  updateOneById(catId: string, catData: Prisma.CatUpdateInput): Promise<Cat> {
    return this.prismaService.cat.update({
      where: { id: Number(catId) },
      data: {
        name: catData.name,
        color: catData.color,
        petPassport: catData.petPassport,
        avatar: catData.avatar,
      },
    });
  }

  deleteOneById(catId: string): Promise<Cat> {
    return this.prismaService.cat.delete({ where: { id: Number(catId) } });
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../core/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<User[]> {
    return this.prismaService.user.findMany({});
  }

  getOneById(userId: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id: Number(userId) },
      include: { cars: true, cats: true },
    });
  }

  createOne(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  updateOneById(
    userId: string,
    userData: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prismaService.user.update({
      where: { id: Number(userId) },
      data: {
        name: userData.name,
        city: userData.city,
        age: userData.age,
        avatar: userData.avatar,
      },
    });
  }

  deleteOneById(userId: string): Promise<User> {
    return this.prismaService.user.delete({ where: { id: Number(userId) } });
  }

  async getUserByEmail(userEmail: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { email: userEmail } });
  }
}

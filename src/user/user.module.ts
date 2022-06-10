import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../core/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UserService, PrismaService, JwtService],
  controllers: [UserController],
  imports: [forwardRef(() => AuthModule)],
})
export class UserModule {}

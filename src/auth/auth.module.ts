import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../core/prisma.service';
import { constants } from '../constants/constants';
import { UserService } from '../user/user.service';

@Module({
  providers: [AuthService, PrismaService, UserService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: constants.PRIVATE_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}

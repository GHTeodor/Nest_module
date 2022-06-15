import { Module } from '@nestjs/common';

import { S0cketService } from './s0cket.service';
import { S0cketGateway } from './s0cket.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [S0cketService, S0cketGateway],
  imports: [AuthModule],
})
export class S0cketModule {}

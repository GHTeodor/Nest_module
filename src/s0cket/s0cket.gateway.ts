import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';

@WebSocketGateway({
  pingTimeout: 60000,
})
export class S0cketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly authService: AuthService) {}

  @SubscribeMessage('join')
  async joinRoom(client: Socket, data: { accessToken: string }) {
    const userIdN = await this.authService.getVerifiedUserId(data.accessToken);
    if (!userIdN) {
      // client.emit('user-no-auth', { statusCode: 401, error: 'Not authorized' });

      throw new UnauthorizedException({ message: 'Not authorized' });
    }

    console.log(userIdN);
    // return 'Success';
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

import { constants } from '../constants/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ').shift();
      const token = authHeader.split(' ').pop();

      if (bearer !== 'Bearer' || !token)
        throw new UnauthorizedException({ message: 'User is not authorized' });

      const user = this.jwtService.verify(token, {
        secret: constants.PRIVATE_KEY,
      });
      request.user = user;

      return true;
    } catch (err) {
      throw new UnauthorizedException({ message: err });
    }
  }
}

import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import {verify} from 'jsonwebtoken';
import { promisify } from 'util';
import { UsersService } from '../../users/users.service';

@Injectable()
export class ProtectGuard implements CanActivate {
  constructor(@Inject('UsersService') private readonly usersService: UsersService) {}


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;

    if (!bearerToken) return false;
    if (!bearerToken.startsWith('Bearer ')) return false;

    const token = bearerToken.split(' ')[1];

    const {id, iat}: {id: string, iat: number} =
      await promisify<any, any, any>(verify)(token, process.env.JSON_WEB_TOKEN_SECRET);

    const user = await this.usersService.findUser({_id: id});

    if (!user) return false;
    if (user.isPasswordChanged(iat)) return false;

    request.user = user;

    return true;
  }
}

import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('UsersService') private readonly usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles)
      return true;

    if (roles.includes(request.user.rote))
      return true;

    if (roles.includes('selfUser'))
      if (request.params.id.toString() === request.user._id.toString())
        return true;

    return false;
  }
}

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext) {
    const required = this.reflector.get<string[]>('roles', ctx.getHandler()) || [];
    if (required.length === 0) return true;
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user) return false;
    if (!required.includes(user.role)) {
      throw new ForbiddenException('Insufficient role');
    }
    return true;
  }
}

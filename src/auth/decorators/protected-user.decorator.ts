import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ProtectedUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    context.switchToHttp().getRequest().user
);

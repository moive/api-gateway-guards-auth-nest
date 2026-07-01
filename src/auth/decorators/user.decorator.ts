import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user?: unknown;
}

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();

    if (!request.user) {
      throw new InternalServerErrorException(
        'User not found or not provided by auth.guard',
      );
    }

    return request.user;
  },
);

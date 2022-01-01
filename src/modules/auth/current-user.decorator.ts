import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserContext } from './auth.interfaces';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    /**
     * key point: erase password from user before return to client.
     */
    const { password, ...user } = ctx.getContext<UserContext>().req.user;
    return user;
  },
);

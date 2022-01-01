import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext): unknown {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    /**
     * key point: assign input args to req.body
     * passport-local strategy lookup username/password from req.body or req.query
     * https://github.com/jaredhanson/passport-local/blob/master/lib/strategy.js#L71-L72
     */
    request.body = ctx.getArgs().input;
    return request;
  }
}

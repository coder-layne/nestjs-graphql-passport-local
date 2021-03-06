import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { promisify } from 'util';

import { LocalAuthGuard, AuthenticatedGuard } from 'src/guards';
import { CurrentUser } from 'src/decorators';
import { UserDTO } from '../user/user.dto';
import { AuthService } from './auth.service';
import { LoginInputDTO } from './dto/login-input.dto';
import { AuthenticatedUser } from './auth.interfaces';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation((returns) => Boolean)
  async login(
    @Context('req') req,
    @Args('input') input: LoginInputDTO,
  ): Promise<boolean> {
    const user = await this.authService.validateUser(
      input.username,
      input.password,
    );
    if (!user) {
      req.logout();
      throw new UnauthorizedException();
    }

    await promisify(req.login.bind(req))(user);
    return true;
  }

  @UseGuards(AuthenticatedGuard)
  @Query(() => UserDTO)
  me(@CurrentUser() user: AuthenticatedUser): Promise<UserDTO> {
    return this.authService.currentUser(user);
  }
}

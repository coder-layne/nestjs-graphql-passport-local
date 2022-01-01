import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { AuthenticatedUser } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // 注意，这里需要换成真正的校验逻辑，如查询数据库，调用验证接口等
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      /**
       * key point: return user with property username and password
       * The returned user will be used in validate method of strategy and finally used in session generate.
       * The session will be used to retrieve user in the subsequent quests need authentication.
       * The retrieved user need property username and password which required by passport-local strategy.
       */
      return user;
    }
    return null;
  }

  async currentUser(authUser: AuthenticatedUser): Promise<UserDTO> {
    try {
      const user = await this.userService.findOne(authUser.username);
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

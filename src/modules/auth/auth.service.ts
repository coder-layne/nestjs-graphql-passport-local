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
       * key point: erase password from user.
       */
      const { password, ...result } = user;
      return result;
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

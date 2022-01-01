import { UserDTO } from '../user/user.dto';
import { UserEntity } from '../user/user.entity';

export type AuthenticatedUser = UserDTO;

export type UserContext = {
  req: { user: UserEntity };
};

import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  // mock users
  private readonly users: UserEntity[] = [
    { id: 1, username: 'john', password: 'changeme' },
    { id: 2, username: 'maria', password: 'guess' },
  ];

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.users.find((user) => user.username === username);
  }
}

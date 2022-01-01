import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserDTO {
  @Field()
  id!: number;

  @Field()
  username!: string;
}

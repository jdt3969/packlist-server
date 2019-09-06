import { ObjectType, Field } from 'type-graphql';
import { User } from '@/entities/User';

@ObjectType()
export class LoginSuccess {
  @Field()
  token: string;

  @Field()
  user: User;
}

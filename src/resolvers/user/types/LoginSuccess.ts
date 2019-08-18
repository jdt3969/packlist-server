import { ObjectType, Field } from 'type-graphql';
import { User } from '@/entities/User';

@ObjectType()
export class LoginSuccess {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  token: string;

  @Field({ nullable: true })
  user: User;
}

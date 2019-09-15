import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';

import { User } from '@/entities/User';

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field({ nullable: true })
  @Length(1, 30)
  firstName?: string;

  @Field({ nullable: true })
  @Length(1, 30)
  lastName?: string;

  @Field({ nullable: true })
  imageUrl: string;
}

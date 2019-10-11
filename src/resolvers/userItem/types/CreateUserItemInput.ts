import { InputType, Field, ID } from 'type-graphql';

import { UserItem } from '@/entities/UserItem';

@InputType()
export class CreateUserItemInput implements Partial<UserItem> {
  @Field(() => ID)
  itemId: number;
}

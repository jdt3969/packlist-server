import { InputType, Field, ID } from 'type-graphql';

import { UserItem } from '@/entities/UserItem';

@InputType()
export class CreateUserItemInput implements Partial<UserItem> {
  @Field()
  isOwned: boolean;

  @Field(() => ID)
  itemId: number;

  @Field(() => ID)
  categoryId: number;
}

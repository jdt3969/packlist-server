import { InputType, Field, ID } from 'type-graphql';

import { UserItem } from '@/entities/UserItem';

@InputType()
export class UpdateUserItemInput implements Partial<UserItem> {
  @Field({ nullable: true })
  isOwned?: boolean;

  @Field(() => ID, { nullable: true })
  itemId?: number;

  @Field(() => ID, { nullable: true })
  categoryId?: number;
}

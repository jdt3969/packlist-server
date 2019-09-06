import { InputType, Field } from 'type-graphql';

import { UserItem } from '@/entities/UserItem';

@InputType()
export class UpdateUserItemInput implements Partial<UserItem> {
  @Field({ nullable: true })
  isOwned?: boolean;

  @Field({ nullable: true })
  userId?: number;

  @Field({ nullable: true })
  itemId?: number;

  @Field({ nullable: true })
  categoryId?: number;
}

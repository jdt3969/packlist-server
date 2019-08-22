import { InputType, Field } from 'type-graphql';

import { ListUserItem } from '@/entities/ListUserItem';

@InputType()
export class UpdateListUserItemInput implements Partial<ListUserItem> {
  @Field({ nullable: true })
  userItemId?: number;

  @Field({ nullable: true })
  listId?: number;
}

import { InputType, Field, ID } from 'type-graphql';

import { ListUserItem } from '@/entities/ListUserItem';

@InputType()
export class UpdateListUserItemInput implements Partial<ListUserItem> {
  @Field({ nullable: true })
  name?: string;
}

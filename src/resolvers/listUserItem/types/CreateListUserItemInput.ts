import { InputType, Field } from 'type-graphql';

import { ListUserItem } from '@/entities/ListUserItem';

@InputType()
export class CreateListUserItemInput implements Partial<ListUserItem> {
  @Field()
  name: string;
}

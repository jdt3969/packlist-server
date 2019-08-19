import { InputType, Field } from 'type-graphql';

import { Item } from '@/entities/Item';

@InputType()
export class CreateItemInput implements Partial<Item> {
  @Field()
  name: string;
}

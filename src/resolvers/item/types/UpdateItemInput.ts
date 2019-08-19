import { InputType, Field, ID } from 'type-graphql';

import { Item } from '@/entities/Item';

@InputType()
export class UpdateItemInput implements Partial<Item> {
  @Field({ nullable: true })
  name?: string;
}

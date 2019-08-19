import { InputType, Field } from 'type-graphql';

import { List } from '@/entities/List';

@InputType()
export class CreateListInput implements Partial<List> {
  @Field()
  name: string;
}

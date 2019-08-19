import { InputType, Field, ID } from 'type-graphql';

import { List } from '@/entities/List';

@InputType()
export class UpdateListInput implements Partial<List> {
  @Field({ nullable: true })
  name?: string;
}

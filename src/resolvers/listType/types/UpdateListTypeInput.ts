import { InputType, Field, ID } from 'type-graphql';

import { ListType } from '@/entities/ListType';

@InputType()
export class UpdateListTypeInput implements Partial<ListType> {
  @Field({ nullable: true })
  name?: string;
}

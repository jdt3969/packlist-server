import { InputType, Field } from 'type-graphql';

import { ListType } from '@/entities/ListType';

@InputType()
export class CreateListTypeInput implements Partial<ListType> {
  id: number;
}

import { InputType, Field } from 'type-graphql';

import { Thing } from '@/entities/Thing';

@InputType()
export class CreateInput implements Partial<Thing> {
  @Field()
  name: string;
}

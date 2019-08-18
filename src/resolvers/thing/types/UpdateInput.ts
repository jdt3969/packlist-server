import { InputType, Field, ID } from 'type-graphql';

import { Thing } from '@/entities/Thing';

@InputType()
export class UpdateInput implements Partial<Thing> {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  name?: string;
}

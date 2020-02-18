import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class ClonePackItemInput {
  @Field(() => ID)
  packId: number;
}

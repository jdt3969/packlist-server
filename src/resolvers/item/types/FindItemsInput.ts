import { InputType, Field } from 'type-graphql';

@InputType()
export class FindItemsInput {
  @Field({ nullable: true })
  search?: string;
}

import { InputType, Field } from 'type-graphql';

@InputType()
export class CategoriesInput {
  @Field()
  isOwned: boolean;
}

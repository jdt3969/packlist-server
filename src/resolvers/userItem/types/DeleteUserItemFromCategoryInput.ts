import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class DeleteUserItemFromCategoryInput {
  @Field(() => ID)
  categoryId: number;
}

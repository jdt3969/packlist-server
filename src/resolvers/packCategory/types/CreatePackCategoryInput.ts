import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class CreatePackCategoryInput {
  @Field(() => ID)
  packId: number;

  @Field()
  categoryName: string;
}

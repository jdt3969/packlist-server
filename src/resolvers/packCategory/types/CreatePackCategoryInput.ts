import { InputType, Field } from 'type-graphql';

@InputType()
export class CreatePackCategoryInput {
  @Field()
  packId: number;

  @Field()
  categoryName: string;
}

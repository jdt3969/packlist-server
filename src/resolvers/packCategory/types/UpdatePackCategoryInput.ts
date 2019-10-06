import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdatePackCategoryInput {
  @Field()
  categoryName: string;
}

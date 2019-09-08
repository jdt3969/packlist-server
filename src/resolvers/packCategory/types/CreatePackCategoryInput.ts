import { InputType, Field, ID } from 'type-graphql';

import { PackCategory } from '@/entities/PackCategory';

@InputType()
export class CreatePackCategoryInput implements Partial<PackCategory> {
  @Field()
  packId: number;

  @Field(() => ID)
  categoryId: number;
}

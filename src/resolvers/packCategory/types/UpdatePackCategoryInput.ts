import { InputType, Field, ID } from 'type-graphql';

import { PackCategory } from '@/entities/PackCategory';

@InputType()
export class UpdatePackCategoryInput implements Partial<PackCategory> {
  @Field({ nullable: true })
  packId?: number;

  @Field(() => ID, { nullable: true })
  categoryId?: number;
}

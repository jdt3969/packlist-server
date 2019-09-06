import { InputType, Field } from 'type-graphql';

import { PackCategory } from '@/entities/PackCategory';

@InputType()
export class UpdatePackCategoryInput implements Partial<PackCategory> {
  @Field({ nullable: true })
  packId?: number;

  @Field({ nullable: true })
  categoryId?: number;
}

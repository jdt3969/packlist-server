import { InputType, Field, ID } from 'type-graphql';

import { PackItem } from '@/entities/PackItem';

@InputType()
export class UpdatePackItemInput implements Partial<PackItem> {
  @Field({ nullable: true })
  isWorn?: boolean;

  @Field(() => ID, { nullable: true })
  userItemId?: number;

  @Field(() => ID, { nullable: true })
  packCategoryId?: number;
}

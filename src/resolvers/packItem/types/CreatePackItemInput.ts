import { InputType, Field, ID, Int } from 'type-graphql';

import { PackItem } from '@/entities/PackItem';

@InputType()
export class CreatePackItemInput implements Partial<PackItem> {
  @Field({ defaultValue: false })
  isWorn?: boolean;

  @Field(() => Int, { defaultValue: 1 })
  quantity?: number;

  @Field(() => ID)
  userItemId: number;

  @Field(() => ID)
  packCategoryId: number;
}

import { InputType, Field, ID } from 'type-graphql';

import { PackItem } from '@/entities/PackItem';

@InputType()
export class CreatePackItemInput implements Partial<PackItem> {
  @Field()
  isWorn: boolean;

  @Field(() => ID)
  userItemId: number;

  @Field(() => ID)
  packCategoryId: number;
}

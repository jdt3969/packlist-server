import { InputType, Field, ID, Int } from 'type-graphql';

import { PackItem } from '@/entities/PackItem';
import { CreateItemInput } from '@/resolvers/item/types/CreateItemInput';

@InputType()
export class CreatePackItemInput implements Partial<PackItem> {
  @Field({ defaultValue: false })
  isWorn?: boolean;

  @Field(() => Int, { defaultValue: 1 })
  quantity?: number;

  @Field(() => ID, { nullable: true })
  itemId?: number;

  @Field(() => CreateItemInput, { nullable: true })
  itemInput?: CreateItemInput;

  @Field(() => ID)
  packCategoryId: number;
}

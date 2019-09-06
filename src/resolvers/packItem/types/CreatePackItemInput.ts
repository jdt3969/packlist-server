import { InputType, Field } from 'type-graphql';

import { PackItem } from '@/entities/PackItem';

@InputType()
export class CreatePackItemInput implements Partial<PackItem> {
  @Field()
  isWorn: boolean;

  @Field()
  userItemId: number;

  @Field()
  packCategoryId: number;
}

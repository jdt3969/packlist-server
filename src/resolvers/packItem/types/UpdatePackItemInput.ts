import { InputType, Field } from 'type-graphql';

import { PackItem } from '@/entities/PackItem';

@InputType()
export class UpdatePackItemInput implements Partial<PackItem> {
  @Field({ nullable: true })
  isWorn?: boolean;

  @Field({ nullable: true })
  userItemId?: number;

  @Field({ nullable: true })
  packCategoryId?: number;
}

import { InputType, Field, ID, Int } from 'type-graphql';

import { PackItem } from '@/entities/PackItem';

@InputType()
export class UpdatePackItemInput implements Partial<PackItem> {
  @Field({ nullable: true })
  isWorn?: boolean;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => ID, { nullable: true })
  packCategoryId?: number;
}

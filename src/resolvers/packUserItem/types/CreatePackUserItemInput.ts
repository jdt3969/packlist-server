import { InputType, Field } from 'type-graphql';

import { PackUserItem } from '@/entities/PackUserItem';

@InputType()
export class CreatePackUserItemInput implements Partial<PackUserItem> {
  @Field({ nullable: true })
  isWorn?: boolean;

  @Field()
  userItemId: number;

  @Field()
  packId: number;
}

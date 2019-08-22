import { InputType, Field } from 'type-graphql';

import { PackUserItem } from '@/entities/PackUserItem';

@InputType()
export class UpdatePackUserItemInput implements Partial<PackUserItem> {
  @Field({ nullable: true })
  isWorn?: boolean;
}

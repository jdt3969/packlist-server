import { InputType, Field, ID } from 'type-graphql';

import { Item } from '@/entities/Item';

@InputType()
export class UpdateItemInput implements Partial<Item> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field(() => ID, { nullable: true })
  companyId?: number;

  @Field(() => ID, { nullable: true })
  unitOfMeasureId?: number;
}

import { InputType, Field, ID, Int } from 'type-graphql';

import { Item } from '@/entities/Item';
import { UnitOfMeasure } from '@/enums/UnitOfMeasure';

@InputType()
export class UpdateItemInput implements Partial<Item> {
  @Field({ nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field(() => ID, { nullable: true })
  companyId?: number;

  @Field(() => UnitOfMeasure, { nullable: true })
  unitOfMeasure?: UnitOfMeasure;
}

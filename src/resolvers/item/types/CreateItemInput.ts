import { InputType, Field, ID, Int } from 'type-graphql';

import { Item } from '@/entities/Item';
import { UnitOfMeasure } from '@/enums/UnitOfMeasure';

@InputType()
export class CreateItemInput implements Partial<Item> {
  @Field()
  name: string;

  @Field(() => Int)
  price: number;

  @Field()
  weight: number;

  @Field()
  imageUrl: string;

  @Field(() => ID)
  companyId: number;

  @Field(() => UnitOfMeasure)
  unitOfMeasure: UnitOfMeasure;
}

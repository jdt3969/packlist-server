import { InputType, Field, ID } from 'type-graphql';

import { Item } from '@/entities/Item';

@InputType()
export class CreateItemInput implements Partial<Item> {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  weight: number;

  @Field()
  imageUrl: string;

  @Field(() => ID)
  companyId: number;

  @Field(() => ID)
  unitOfMeasureId: number;
}

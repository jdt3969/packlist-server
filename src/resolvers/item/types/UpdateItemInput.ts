import { InputType, Field } from 'type-graphql';

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
  companyId?: number;

  @Field({ nullable: true })
  unitOfMeasureId?: number;
}

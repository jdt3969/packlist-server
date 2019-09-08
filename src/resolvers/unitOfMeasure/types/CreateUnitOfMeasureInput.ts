import { InputType, Field } from 'type-graphql';

import { UnitOfMeasure } from '@/entities/UnitOfMeasure';

@InputType()
export class CreateUnitOfMeasureInput implements Partial<UnitOfMeasure> {
  @Field()
  name: string;

  @Field()
  symbol: string;
}

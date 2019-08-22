import { InputType, Field } from 'type-graphql';

import { UnitOfMeasure } from '@/entities/UnitOfMeasure';

@InputType()
export class UpdateUnitOfMeasureInput implements Partial<UnitOfMeasure> {
  @Field({ nullable: true })
  name?: string;
}

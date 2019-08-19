import { InputType, Field, ID } from 'type-graphql';

import { Pack } from '@/entities/Pack';

@InputType()
export class UpdatePackInput implements Partial<Pack> {
  @Field({ nullable: true })
  name?: string;
}

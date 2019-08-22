import { InputType, Field } from 'type-graphql';

import { Pack } from '@/entities/Pack';

@InputType()
export class UpdatePackInput implements Partial<Pack> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  isPrivate?: boolean;
}

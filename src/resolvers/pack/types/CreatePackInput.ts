import { InputType, Field } from 'type-graphql';

import { Pack } from '@/entities/Pack';

@InputType()
export class CreatePackInput implements Partial<Pack> {
  @Field({ defaultValue: '' })
  name?: string;

  @Field({ defaultValue: '' })
  description?: string;

  @Field({ defaultValue: true })
  isPrivate?: boolean;
}

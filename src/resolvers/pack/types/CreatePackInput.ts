import { InputType, Field } from 'type-graphql';

import { Pack } from '@/entities/Pack';

@InputType()
export class CreatePackInput implements Partial<Pack> {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  isPrivate: boolean;
}

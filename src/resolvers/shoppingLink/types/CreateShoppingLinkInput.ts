import { InputType, Field, ID } from 'type-graphql';

import { ShoppingLink } from '@/entities/ShoppingLink';

@InputType()
export class CreateShoppingLinkInput implements Partial<ShoppingLink> {
  @Field()
  url: string;

  @Field(() => ID)
  itemId: number;
}

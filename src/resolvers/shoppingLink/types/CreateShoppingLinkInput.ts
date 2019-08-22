import { InputType, Field } from 'type-graphql';

import { ShoppingLink } from '@/entities/ShoppingLink';

@InputType()
export class CreateShoppingLinkInput implements Partial<ShoppingLink> {
  @Field()
  url: string;

  @Field()
  itemId: number;
}

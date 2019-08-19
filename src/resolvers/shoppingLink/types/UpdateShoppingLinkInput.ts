import { InputType, Field, ID } from 'type-graphql';

import { ShoppingLink } from '@/entities/ShoppingLink';

@InputType()
export class UpdateShoppingLinkInput implements Partial<ShoppingLink> {
  @Field({ nullable: true })
  name?: string;
}

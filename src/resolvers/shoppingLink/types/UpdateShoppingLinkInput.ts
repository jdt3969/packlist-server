import { InputType, Field } from 'type-graphql';

import { ShoppingLink } from '@/entities/ShoppingLink';

@InputType()
export class UpdateShoppingLinkInput implements Partial<ShoppingLink> {
  @Field({ nullable: true })
  url?: string;
}

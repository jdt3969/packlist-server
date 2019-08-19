import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { ShoppingLink } from '@/entities/ShoppingLink';

import { CreateShoppingLinkInput } from './types/CreateShoppingLinkInput';
import { UpdateShoppingLinkInput } from './types/UpdateShoppingLinkInput';

import { Auth } from '@/middleware/Auth';

@Resolver(() => ShoppingLink)
export class ShoppingLinkResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all ShoppingLink rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [ShoppingLink])
  async shoppingLinks(): Promise<ShoppingLink[]> {
    return ShoppingLink.find();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get ShoppingLink by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => ShoppingLink)
  async shoppingLink(@Arg('id') id: number): Promise<ShoppingLink> {
    return ShoppingLink.findOne(id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create ShoppingLink
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => ShoppingLink)
  async createShoppingLink(
    @Arg('input') input: CreateShoppingLinkInput
  ): Promise<ShoppingLink> {
    return await ShoppingLink.create(input).save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update ShoppingLink
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => ShoppingLink)
  async updateShoppingLink(
    @Arg('id') id: number,
    @Arg('input') input: UpdateShoppingLinkInput
  ): Promise<ShoppingLink> {
    const shoppingLink = await ShoppingLink.findOne(id);
    await ShoppingLink.merge(shoppingLink, input);
    return await shoppingLink.save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete ShoppingLink
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteShoppingLink(@Arg('id') id: number): Promise<Boolean> {
    const shoppingLink = await ShoppingLink.findOne(id);
    await shoppingLink.remove();
    return true;
  }
}

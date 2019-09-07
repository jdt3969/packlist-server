import {
  Resolver,
  ID,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { ShoppingLink } from '@/entities/ShoppingLink';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';

import { Context } from '@/types/Context';
import { CreateShoppingLinkInput } from './types/CreateShoppingLinkInput';
import { UpdateShoppingLinkInput } from './types/UpdateShoppingLinkInput';

@Resolver(() => ShoppingLink)
export class ShoppingLinkResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all ShoppingLink rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [ShoppingLink])
  async shoppingLinks(): Promise<ShoppingLink[]> {
    return getAll<ShoppingLink>(ShoppingLink);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get ShoppingLink by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => ShoppingLink)
  async shoppingLink(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<ShoppingLink> {
    return getOne<ShoppingLink>(ShoppingLink, id, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create ShoppingLink
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => ShoppingLink)
  async createShoppingLink(
    @Arg('input') input: CreateShoppingLinkInput,
    @Ctx() ctx: Context
  ): Promise<ShoppingLink> {
    return create<ShoppingLink>(ShoppingLink, input, ctx, { addOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update ShoppingLink
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => ShoppingLink)
  async updateShoppingLink(
    @Arg('id', () => ID) id: number,
    @Arg('input') input: UpdateShoppingLinkInput,
    @Ctx() ctx: Context
  ): Promise<ShoppingLink> {
    return update<ShoppingLink>(ShoppingLink, id, input, ctx, {
      isOwner: true,
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete ShoppingLink
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteShoppingLink(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(ShoppingLink, id, ctx, { isOwner: true });
  }
}

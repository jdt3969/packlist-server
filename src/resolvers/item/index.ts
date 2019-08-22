import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { Item } from '@/entities/Item';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';

import { Context } from '@/types/Context';
import { CreateItemInput } from './types/CreateItemInput';
import { UpdateItemInput } from './types/UpdateItemInput';

@Resolver(() => Item)
export class ItemResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all Item rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [Item])
  async items(): Promise<Item[]> {
    return getAll<Item>(Item);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get Item by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => Item)
  async item(@Arg('id') id: number, @Ctx() ctx: Context): Promise<Item> {
    return getOne<Item>(Item, id, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create Item
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Item)
  async createItem(
    @Arg('input') input: CreateItemInput,
    @Ctx() ctx: Context
  ): Promise<Item> {
    return create<Item>(Item, input, ctx, { addOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update Item
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Item)
  async updateItem(
    @Arg('id') id: number,
    @Arg('input') input: UpdateItemInput,
    @Ctx() ctx: Context
  ): Promise<Item> {
    return update<Item>(Item, id, input, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete Item
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteItem(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(Item, id, ctx, { isOwner: true });
  }
}

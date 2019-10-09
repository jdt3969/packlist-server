import {
  Resolver,
  ID,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { Item } from '@/entities/Item';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';
import { ILike } from '@/utils/typeorm';

import { Context } from '@/types/Context';
import { CreateItemInput } from './types/CreateItemInput';
import { UpdateItemInput } from './types/UpdateItemInput';
import { FindItemsInput } from './types/FindItemsInput';

@Resolver(() => Item)
export class ItemResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all Item rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [Item])
  async items(@Arg('input') { search }: FindItemsInput): Promise<Item[]> {
    return getAll<Item>(
      Item,
      search ? { where: { name: ILike(`%${search}%`) } } : {}
    );
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get Item by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => Item)
  async item(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Item> {
    return getOne<Item>(Item, id, ctx);
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
    return create<Item>(Item, input, ctx);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update Item
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Item)
  async updateItem(
    @Arg('id', () => ID) id: number,
    @Arg('input') input: UpdateItemInput,
    @Ctx() ctx: Context
  ): Promise<Item> {
    return update<Item>(Item, id, input, ctx);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete Item
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteItem(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(Item, id, ctx);
  }
}

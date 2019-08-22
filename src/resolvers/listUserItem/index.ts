import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { ListUserItem } from '@/entities/ListUserItem';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';

import { Context } from '@/types/Context';
import { CreateListUserItemInput } from './types/CreateListUserItemInput';
import { UpdateListUserItemInput } from './types/UpdateListUserItemInput';

@Resolver(() => ListUserItem)
export class ListUserItemResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all ListUserItem rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [ListUserItem])
  async listUserItems(): Promise<ListUserItem[]> {
    return getAll<ListUserItem>(ListUserItem);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get ListUserItem by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => ListUserItem)
  async listUserItem(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<ListUserItem> {
    return getOne<ListUserItem>(ListUserItem, id, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create ListUserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => ListUserItem)
  async createListUserItem(
    @Arg('input') input: CreateListUserItemInput,
    @Ctx() ctx: Context
  ): Promise<ListUserItem> {
    return create<ListUserItem>(ListUserItem, input, ctx, { addOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update ListUserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => ListUserItem)
  async updateListUserItem(
    @Arg('id') id: number,
    @Arg('input') input: UpdateListUserItemInput,
    @Ctx() ctx: Context
  ): Promise<ListUserItem> {
    return update<ListUserItem>(ListUserItem, id, input, ctx, {
      isOwner: true,
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete ListUserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteListUserItem(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(ListUserItem, id, ctx, { isOwner: true });
  }
}

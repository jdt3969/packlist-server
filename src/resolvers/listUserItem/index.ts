import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { ListUserItem } from '@/entities/ListUserItem';

import { CreateListUserItemInput } from './types/CreateListUserItemInput';
import { UpdateListUserItemInput } from './types/UpdateListUserItemInput';

import { Auth } from '@/middleware/Auth';

@Resolver(() => ListUserItem)
export class ListUserItemResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all ListUserItem rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [ListUserItem])
  async listUserItems(): Promise<ListUserItem[]> {
    return ListUserItem.find();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get ListUserItem by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => ListUserItem)
  async listUserItem(@Arg('id') id: number): Promise<ListUserItem> {
    return ListUserItem.findOne(id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create ListUserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => ListUserItem)
  async createListUserItem(
    @Arg('input') input: CreateListUserItemInput
  ): Promise<ListUserItem> {
    return await ListUserItem.create(input).save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update ListUserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => ListUserItem)
  async updateListUserItem(
    @Arg('id') id: number,
    @Arg('input') input: UpdateListUserItemInput
  ): Promise<ListUserItem> {
    const listUserItem = await ListUserItem.findOne(id);
    await ListUserItem.merge(listUserItem, input);
    return await listUserItem.save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete ListUserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteListUserItem(@Arg('id') id: number): Promise<Boolean> {
    const listUserItem = await ListUserItem.findOne(id);
    await listUserItem.remove();
    return true;
  }
}

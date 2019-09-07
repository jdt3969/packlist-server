import {
  Resolver,
  ID,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { UserItem } from '@/entities/UserItem';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';

import { Context } from '@/types/Context';
import { CreateUserItemInput } from './types/CreateUserItemInput';
import { UpdateUserItemInput } from './types/UpdateUserItemInput';

@Resolver(() => UserItem)
export class UserItemResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all UserItem rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [UserItem])
  async userItems(): Promise<UserItem[]> {
    return getAll<UserItem>(UserItem);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get UserItem by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => UserItem)
  async userItem(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<UserItem> {
    return getOne<UserItem>(UserItem, id, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create UserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => UserItem)
  async createUserItem(
    @Arg('input') input: CreateUserItemInput,
    @Ctx() ctx: Context
  ): Promise<UserItem> {
    return create<UserItem>(UserItem, input, ctx, { addOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update UserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => UserItem)
  async updateUserItem(
    @Arg('id', () => ID) id: number,
    @Arg('input') input: UpdateUserItemInput,
    @Ctx() ctx: Context
  ): Promise<UserItem> {
    return update<UserItem>(UserItem, id, input, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete UserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteUserItem(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(UserItem, id, ctx, { isOwner: true });
  }
}

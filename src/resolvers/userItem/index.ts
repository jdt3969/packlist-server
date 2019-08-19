import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { UserItem } from '@/entities/UserItem';

import { CreateUserItemInput } from './types/CreateUserItemInput';
import { UpdateUserItemInput } from './types/UpdateUserItemInput';

import { Auth } from '@/middleware/Auth';

@Resolver(() => UserItem)
export class UserItemResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all UserItem rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [UserItem])
  async userItems(): Promise<UserItem[]> {
    return UserItem.find();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get UserItem by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => UserItem)
  async userItem(@Arg('id') id: number): Promise<UserItem> {
    return UserItem.findOne(id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create UserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => UserItem)
  async createUserItem(
    @Arg('input') input: CreateUserItemInput
  ): Promise<UserItem> {
    return await UserItem.create(input).save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update UserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => UserItem)
  async updateUserItem(
    @Arg('id') id: number,
    @Arg('input') input: UpdateUserItemInput
  ): Promise<UserItem> {
    const userItem = await UserItem.findOne(id);
    await UserItem.merge(userItem, input);
    return await userItem.save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete UserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteUserItem(@Arg('id') id: number): Promise<Boolean> {
    const userItem = await UserItem.findOne(id);
    await userItem.remove();
    return true;
  }
}

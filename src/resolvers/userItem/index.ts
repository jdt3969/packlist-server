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
import { PackItem } from '@/entities/PackItem';
import { PackCategory } from '@/entities/PackCategory';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update } from '@/utils/resolvers';
import { requireIsOwner } from '@/utils/requirements';
import { getCategoriesByUserItem } from '@/resolvers/category/utils';

import { Context } from '@/types/Context';
import { CreateUserItemInput } from './types/CreateUserItemInput';
import { UpdateUserItemInput } from './types/UpdateUserItemInput';
import { DeleteUserItemFromCategoryInput } from './types/DeleteUserItemFromCategoryInput';
import { In } from 'typeorm';

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
  async deleteUserItemFromCategory(
    @Arg('id', () => ID) id: number,
    @Arg('input') { categoryId }: DeleteUserItemFromCategoryInput,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    const userId = (ctx.user || {}).id;

    const userItem = await UserItem.findOne(id);
    requireIsOwner(ctx, userItem);

    const packCategories = await PackCategory.find({
      where: { categoryId },
    });

    const packItems = await PackItem.find({
      where: {
        userItemId: id,
        packCategoryId: In(packCategories.map(({ id }) => id)),
      },
    });

    PackItem.remove(packItems);

    const userItemCategories = await getCategoriesByUserItem({
      userId,
      userItemId: id,
    });

    // Remove category association
    userItem.categories = userItemCategories.filter(
      ({ id }) => '' + id !== '' + categoryId
    );

    await userItem.save();

    // If userItem would be orphaned, delete.
    if (!userItem.categories.length) {
      await userItem.remove();
    }

    return true;
  }
}

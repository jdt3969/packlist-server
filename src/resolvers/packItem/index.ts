import {
  Resolver,
  ID,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import { uniqBy } from 'lodash';

import { PackItem } from '@/entities/PackItem';
import { PackCategory } from '@/entities/PackCategory';
import { Item } from '@/entities/Item';
import { UserItem } from '@/entities/UserItem';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';
import { NotFoundError } from '@/utils/errors';

import { Context } from '@/types/Context';
import { CreatePackItemInput } from './types/CreatePackItemInput';
import { UpdatePackItemInput } from './types/UpdatePackItemInput';

@Resolver(() => PackItem)
export class PackItemResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all PackItem rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [PackItem])
  async packItems(): Promise<PackItem[]> {
    return getAll<PackItem>(PackItem);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get PackItem by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => PackItem)
  async packItem(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<PackItem> {
    return getOne<PackItem>(PackItem, id, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create PackItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => PackItem)
  async createPackItem(
    @Arg('input') { itemId, packCategoryId, ...rest }: CreatePackItemInput,
    @Ctx() ctx: Context
  ): Promise<PackItem> {
    const userId = ctx.user.id;

    const packCategory = await PackCategory.findOne(packCategoryId, {
      relations: ['category'],
    });
    const item = await Item.findOne(itemId);

    if (!item || !packCategory || packCategory.userId !== userId) {
      throw NotFoundError();
    }

    let userItem = await UserItem.findOne(
      { itemId, userId },
      { relations: ['categories'] }
    );
    const category = await packCategory.category;
    if (!userItem) {
      userItem = await create<UserItem>(UserItem, { itemId }, ctx, {
        addOwner: true,
      });
      userItem.categories = [category];
      await userItem.save();
    } else {
      const categories = await userItem.categories;
      userItem.categories = uniqBy([...categories, category], 'id');
      await userItem.save();
    }

    const input = { userItemId: userItem.id, packCategoryId, ...rest };

    return create<PackItem>(PackItem, input, ctx, { addOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update PackItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => PackItem)
  async updatePackItem(
    @Arg('id', () => ID) id: number,
    @Arg('input') input: UpdatePackItemInput,
    @Ctx() ctx: Context
  ): Promise<PackItem> {
    return update<PackItem>(PackItem, id, input, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete PackItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deletePackItem(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(PackItem, id, ctx, { isOwner: true });
  }
}

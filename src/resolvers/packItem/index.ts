import {
  Resolver,
  ID,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { PackItem } from '@/entities/PackItem';
import { PackCategory } from '@/entities/PackCategory';
import { UserItem } from '@/entities/UserItem';
import { Pack } from '@/entities/Pack';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';
import { NotFoundError } from '@/utils/errors';
import { requireIsOwner } from '@/utils/requirements';

import { Context } from '@/types/Context';
import { CreatePackItemInput } from './types/CreatePackItemInput';
import { UpdatePackItemInput } from './types/UpdatePackItemInput';
import { ClonePackItemInput } from './types/ClonePackItemInput';

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
    @Arg('input')
    { itemId, itemInput, packCategoryId, ...rest }: CreatePackItemInput,
    @Ctx() ctx: Context
  ): Promise<PackItem> {
    const userId = ctx.user.id;

    const packCategory = await PackCategory.findOne(packCategoryId, {
      where: { userId },
      relations: ['category'],
    });
    if (!packCategory) {
      throw NotFoundError(`PackCategory ${packCategoryId}`);
    }

    const category = await packCategory.category;

    const userItem = await UserItem.upsertWithCategory({
      userId,
      itemId,
      itemInput,
      category,
    });

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
  // Clone PackItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => PackCategory)
  async clonePackItem(
    @Arg('id', () => ID) id: number,
    @Arg('input') { packId }: ClonePackItemInput,
    @Ctx() ctx: Context
  ): Promise<PackCategory> {
    const packItem = await PackItem.findOne(id, {
      relations: ['packCategory'],
    });
    requireIsOwner(ctx, packItem);

    const packCategory = await packItem.packCategory;

    if (packId === packCategory.packId) {
      const input = {
        userItemId: packItem.userItemId,
        packCategoryId: packItem.packCategoryId,
      };

      await create<PackItem>(PackItem, input, ctx, { addOwner: true });

      return packCategory;
    }

    const pack = await Pack.findOne(packId);
    requireIsOwner(ctx, pack);

    const newPackCategoryInput = { categoryId: packCategory.id, packId };
    let newPackCategory = await PackCategory.findOne({
      where: newPackCategoryInput,
    });

    if (!newPackCategory) {
      newPackCategory = await create<PackCategory>(
        PackCategory,
        newPackCategoryInput,
        ctx,
        { addOwner: true }
      );
    }

    const input = {
      userItemId: packItem.userItemId,
      packCategoryId: newPackCategory.id,
    };

    await create<PackItem>(PackItem, input, ctx, { addOwner: true });

    return newPackCategory;
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

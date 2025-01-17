import {
  Resolver,
  ID,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import { Not } from 'typeorm';
import { uniqBy } from 'lodash';

import { PackCategory } from '@/entities/PackCategory';
import { Category } from '@/entities/Category';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, validate } from '@/utils/resolvers';

import { findPackCategory, formatCategoryName } from './utils';

import { Context } from '@/types/Context';
import { CreatePackCategoryInput } from './types/CreatePackCategoryInput';
import { UpdatePackCategoryInput } from './types/UpdatePackCategoryInput';
import { PackItem } from '@/entities/PackItem';

@Resolver(() => PackCategory)
export class PackCategoryResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all PackCategory rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [PackCategory])
  async packCategories(): Promise<PackCategory[]> {
    return getAll<PackCategory>(PackCategory);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get PackCategory by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => PackCategory)
  async packCategory(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<PackCategory> {
    return getOne<PackCategory>(PackCategory, id, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create PackCategory
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => PackCategory)
  async createPackCategory(
    @Arg('input') { packId, categoryName }: CreatePackCategoryInput,
    @Ctx() ctx: Context
  ): Promise<PackCategory> {
    const name = formatCategoryName(categoryName);

    if (!name) {
      throw Error('categoryName cannot be empty');
    }

    const packCategory = await findPackCategory({ packId, name });
    if (packCategory) {
      throw Error('Category already exists in this pack');
    }

    const userId = ctx.user.id;

    let category = await Category.findOne({ name, userId });
    if (!category) {
      category = await Category.create({
        name,
        userId,
      }).save();
    }

    const input = { packId, categoryId: category.id };

    return create<PackCategory>(PackCategory, input, ctx, { addOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update PackCategory
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => PackCategory)
  async updatePackCategory(
    @Arg('id', () => ID) id: number,
    @Arg('input') { categoryName }: UpdatePackCategoryInput,
    @Ctx() ctx: Context
  ): Promise<PackCategory> {
    const userId = ctx.user.id;
    const name = formatCategoryName(categoryName);

    if (!name) {
      throw Error('categoryName cannot be empty');
    }

    const packCategory = await PackCategory.findOne(id);
    const category = await Category.findOne(packCategory.categoryId, {
      relations: ['userItems'],
    });

    await validate(packCategory, ctx, {
      isOwner: true,
      getOwnerId: () => category.userId,
    });

    const currentPackCategory = await findPackCategory({
      packId: packCategory.packId,
      name,
    });

    if (currentPackCategory) {
      // Updating current category to itself, no update necessary
      if (currentPackCategory.id === packCategory.id) {
        return packCategory;
      }

      // Categories in pack must be unique by name
      throw Error('Category already exists in this pack');
    }

    let nextCategory = await Category.findOne(
      { name, userId },
      {
        relations: ['userItems'],
      }
    );

    const otherPackCategories = await PackCategory.find({
      where: {
        id: Not(packCategory.id),
        categoryId: packCategory.categoryId,
      },
      relations: ['packItems'],
    });

    const packCategoryWasUnique = !otherPackCategories.length;

    // No other pack uses the category and next Catgeory doesn't already exist
    // so just update category name and items are already linked
    if (packCategoryWasUnique && !nextCategory) {
      Category.merge(category, { name });
      await category.save();
    } else {
      // The next Catgeory doesn't already exist so we create it (we'll save later)
      if (!nextCategory) {
        nextCategory = await Category.create({ name, userId }).save();
      }

      // Point pack category to the next category
      PackCategory.merge(packCategory, { categoryId: nextCategory.id });
      await packCategory.save();

      // Update user items to point to correct categories
      if (packCategoryWasUnique) {
        // Just remove UserItems from old Category

        // Category will be orphaned so we remove it
        await category.remove();
      } else {
        // Check if we need to remove UserItems from old Category
        let exists: { [key: string]: Boolean } = {};

        for (const otherPackCategory of otherPackCategories) {
          const otherPackItems = await otherPackCategory.packItems;
          for (const otherPackItem of otherPackItems) {
            exists[otherPackItem.userItemId] = true;
          }
        }

        category.userItems = category.userItems.filter(({ id }) => exists[id]);

        await category.save();
      }

      // Just add UserItems to next Category if they don't already exist

      const packItems = await PackItem.find({
        where: { packCategoryId: packCategory.id },
        relations: ['userItem'],
      });

      const userItems = await Promise.all(
        packItems.map(async (packItem) => {
          return await packItem.userItem;
        })
      );

      nextCategory.userItems = uniqBy(
        [...(nextCategory.userItems || []), ...userItems],
        'id'
      );

      await nextCategory.save();
    }

    return packCategory;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete PackCategory
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deletePackCategory(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    const packCategory = await PackCategory.findOne(id);
    const category = await Category.findOne(packCategory.categoryId);

    await validate(packCategory, ctx, {
      isOwner: true,
      getOwnerId: () => category.userId,
    });

    const packItems = await PackItem.find({
      where: { packCategoryId: packCategory.id },
    });

    await PackItem.remove(packItems);

    await packCategory.remove();

    return true;
  }
}

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

import { getAll, getOne, create, destroy, validate } from '@/utils/resolvers';
import { NotFoundError } from '@/utils/errors';

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

    console.log('==========================================================');
    console.log('Update PackCategory');
    console.log();
    console.log(packCategory);
    console.log(category);

    const currentPackCategory = await findPackCategory({
      packId: packCategory.packId,
      name,
    });

    if (currentPackCategory) {
      // Updating current category to itself, no update necessary
      if (currentPackCategory.id === packCategory.id) {
        console.log('Updating current category to itself, no update necessary');
        console.log(
          '=========================================================='
        );
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

    console.log('Pack Category Was Unique:', packCategoryWasUnique);

    // No other pack uses the category and next Catgeory doesn't already exist
    // so just update category name and items are already linked
    if (packCategoryWasUnique && !nextCategory) {
      console.log('Just change category name to', name);
      Category.merge(category, { name });
      await category.save();
    } else {
      // The next Catgeory doesn't already exist so we create it (we'll save later)
      if (!nextCategory) {
        nextCategory = await Category.create({ name, userId }).save();
        console.log('Create new Catgory', name);
      } else {
        console.log('Reusing existing Category');
      }

      // Point pack category to the next category
      PackCategory.merge(packCategory, { categoryId: nextCategory.id });
      await packCategory.save();

      // Update user items to point to correct categories
      if (packCategoryWasUnique) {
        // TODO test if deleting userItems is necessary since we delete
        // Just remove UserItems from old Category
        console.log('Remove UserItems from old Category');
        console.log(category.userItems);

        // Category will be orphaned so we remove it
        console.log('Remove category', category.name);
        await category.remove();
      } else {
        // Check if we need to remove UserItems from old Category
        console.log('Check if we need to remove UserItems from old Category');
        console.log(category.userItems);
        let exists: { [key: string]: Boolean } = {};

        for (const otherPackCategory of otherPackCategories) {
          const otherPackItems = await otherPackCategory.packItems;
          for (const otherPackItem of otherPackItems) {
            exists[otherPackItem.userItemId] = true;
          }
        }

        category.userItems = category.userItems.filter(({ id }) => exists[id]);
        console.log('After removal');
        console.log(category.userItems);
        await category.save();
      }

      // Just add UserItems to next Category if they don't already exist
      console.log("Add UserItems to next Category if they don't already exist");

      const packItems = await PackItem.find({
        where: { packCategoryId: packCategory.id },
        relations: ['userItem'],
      });

      const userItems = await Promise.all(
        packItems.map(async (packItem) => {
          return await packItem.userItem;
        })
      );
      console.log(userItems);

      nextCategory.userItems = uniqBy(
        [...(nextCategory.userItems || []), ...userItems],
        'id'
      );
      console.log('After add');
      console.log(nextCategory.userItems);
      await nextCategory.save();
    }

    console.log('==========================================================');
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
      relations: ['userItem', 'userItem.packItems'],
    });

    console.log('==========================================================');
    console.log('Delete PackCategory');
    console.log();
    console.log(packCategory);
    console.log(category);
    console.log(packItems);

    const otherPackCategoriesCount = await PackCategory.count({
      where: {
        id: Not(packCategory.id),
        categoryId: packCategory.categoryId,
      },
    });

    for (const packItem of packItems) {
      const userItem = await packItem.userItem;
      const otherPackItems = await userItem.packItems;

      const userItemUnique = !otherPackItems.find(
        ({ id }) => packItem.id !== id
      );

      console.log(
        'PackItem',
        packItem.id,
        `is${userItemUnique ? '' : ' not'} unique`
      );

      console.log('Deleting PackItem', packItem.id);
      await packItem.remove();

      if (userItemUnique) {
        console.log('Deleting UserItem', userItem.id);
        await userItem.remove();
      }
    }

    console.log('Deleting PackCategory', packCategory.id);
    await packCategory.remove();

    if (!otherPackCategoriesCount) {
      console.log('Category', packCategory.categoryId, 'is unique, deleting');
      await category.remove();
    }

    return true;
  }
}

import {
  Resolver,
  ID,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { Category } from '@/entities/Category';
import { PackCategory } from '@/entities/PackCategory';

import { Auth } from '@/middleware/Auth';

import { getOne, create, update, destroy } from '@/utils/resolvers';
import { getCategories } from './utils';
import { getUserItemsByCategory } from '@/resolvers/userItem/utils';

import { Context } from '@/types/Context';
import { CreateCategoryInput } from './types/CreateCategoryInput';
import { UpdateCategoryInput } from './types/UpdateCategoryInput';
import { requireIsOwner } from '@/utils/requirements';
import { PackItem } from '@/entities/PackItem';

@Resolver(() => Category)
export class CategoryResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all Category rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [Category])
  async categories(@Ctx() ctx: Context): Promise<Category[]> {
    const userId = (ctx.user || {}).id;

    return getCategories({ userId });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get Category by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => Category)
  async category(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Category> {
    return getOne<Category>(Category, id, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create Category
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Category)
  async createCategory(
    @Arg('input') input: CreateCategoryInput,
    @Ctx() ctx: Context
  ): Promise<Category> {
    return create<Category>(Category, input, ctx, { addOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update Category
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Category)
  async updateCategory(
    @Arg('id', () => ID) id: number,
    @Arg('input') input: UpdateCategoryInput,
    @Ctx() ctx: Context
  ): Promise<Category> {
    return update<Category>(Category, id, input, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete Category
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    const userId = (ctx.user || {}).id;

    const category = await Category.findOne(id);
    requireIsOwner(ctx, category);

    const packCategories = await PackCategory.find({
      where: { categoryId: id },
      relations: ['packItems'],
    });

    for (const packCategory of packCategories) {
      const packItems = await packCategory.packItems;

      await PackItem.remove(packItems);
    }

    await PackCategory.remove(packCategories);

    const userItems = await getUserItemsByCategory({ userId, categoryId: id });

    for (const userItem of userItems) {
      const categories = await userItem.categories;

      if (categories.length === 1) {
        userItem.remove();
      }
    }

    await category.remove();

    return true;
  }
}

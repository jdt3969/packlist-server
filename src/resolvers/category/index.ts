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

import { Auth } from '@/middleware/Auth';

import { getOne, create, update, destroy } from '@/utils/resolvers';
import { getCategories } from './utils';

import { Context } from '@/types/Context';
import { CreateCategoryInput } from './types/CreateCategoryInput';
import { UpdateCategoryInput } from './types/UpdateCategoryInput';

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

  /*
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
    return destroy(Category, id, ctx, { isOwner: true });
  }
  */
}

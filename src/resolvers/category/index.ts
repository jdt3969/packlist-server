import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { Category } from '@/entities/Category';

import { CreateCategoryInput } from './types/CreateCategoryInput';
import { UpdateCategoryInput } from './types/UpdateCategoryInput';

import { Auth } from '@/middleware/Auth';

@Resolver(() => Category)
export class CategoryResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all Category rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return Category.find();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get Category by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => Category)
  async category(@Arg('id') id: number): Promise<Category> {
    return Category.findOne(id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create Category
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Category)
  async createCategory(
    @Arg('input') input: CreateCategoryInput
  ): Promise<Category> {
    return await Category.create(input).save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update Category
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Category)
  async updateCategory(
    @Arg('id') id: number,
    @Arg('input') input: UpdateCategoryInput
  ): Promise<Category> {
    const category = await Category.findOne(id);
    await Category.merge(category, input);
    return await category.save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete Category
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteCategory(@Arg('id') id: number): Promise<Boolean> {
    const category = await Category.findOne(id);
    await category.remove();
    return true;
  }
}

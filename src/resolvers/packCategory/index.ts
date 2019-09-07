import {
  Resolver,
  ID,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { PackCategory } from '@/entities/PackCategory';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';

import { Context } from '@/types/Context';
import { CreatePackCategoryInput } from './types/CreatePackCategoryInput';
import { UpdatePackCategoryInput } from './types/UpdatePackCategoryInput';

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
    @Arg('input') input: CreatePackCategoryInput,
    @Ctx() ctx: Context
  ): Promise<PackCategory> {
    return create<PackCategory>(PackCategory, input, ctx, { addOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update PackCategory
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => PackCategory)
  async updatePackCategory(
    @Arg('id', () => ID) id: number,
    @Arg('input') input: UpdatePackCategoryInput,
    @Ctx() ctx: Context
  ): Promise<PackCategory> {
    return update<PackCategory>(PackCategory, id, input, ctx, {
      isOwner: true,
    });
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
    return destroy(PackCategory, id, ctx, { isOwner: true });
  }
}

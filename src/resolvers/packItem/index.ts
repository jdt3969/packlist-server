import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { PackItem } from '@/entities/PackItem';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';

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
    @Arg('id') id: number,
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
    @Arg('input') input: CreatePackItemInput,
    @Ctx() ctx: Context
  ): Promise<PackItem> {
    return create<PackItem>(PackItem, input, ctx, { addOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update PackItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => PackItem)
  async updatePackItem(
    @Arg('id') id: number,
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
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(PackItem, id, ctx, { isOwner: true });
  }
}

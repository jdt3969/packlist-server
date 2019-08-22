import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { PackUserItem } from '@/entities/PackUserItem';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';

import { Context } from '@/types/Context';
import { CreatePackUserItemInput } from './types/CreatePackUserItemInput';
import { UpdatePackUserItemInput } from './types/UpdatePackUserItemInput';

@Resolver(() => PackUserItem)
export class PackUserItemResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all PackUserItem rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [PackUserItem])
  async packUserItems(): Promise<PackUserItem[]> {
    return getAll<PackUserItem>(PackUserItem);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get PackUserItem by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => PackUserItem)
  async packUserItem(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<PackUserItem> {
    return getOne<PackUserItem>(PackUserItem, id, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create PackUserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => PackUserItem)
  async createPackUserItem(
    @Arg('input') input: CreatePackUserItemInput,
    @Ctx() ctx: Context
  ): Promise<PackUserItem> {
    return create<PackUserItem>(PackUserItem, input, ctx, { addOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update PackUserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => PackUserItem)
  async updatePackUserItem(
    @Arg('id') id: number,
    @Arg('input') input: UpdatePackUserItemInput,
    @Ctx() ctx: Context
  ): Promise<PackUserItem> {
    return update<PackUserItem>(PackUserItem, id, input, ctx, {
      isOwner: true,
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete PackUserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deletePackUserItem(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(PackUserItem, id, ctx, { isOwner: true });
  }
}

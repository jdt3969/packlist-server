import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { PackUserItem } from '@/entities/PackUserItem';

import { CreatePackUserItemInput } from './types/CreatePackUserItemInput';
import { UpdatePackUserItemInput } from './types/UpdatePackUserItemInput';

import { Auth } from '@/middleware/Auth';

@Resolver(() => PackUserItem)
export class PackUserItemResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all PackUserItem rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [PackUserItem])
  async packUserItems(): Promise<PackUserItem[]> {
    return PackUserItem.find();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get PackUserItem by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => PackUserItem)
  async packUserItem(@Arg('id') id: number): Promise<PackUserItem> {
    return PackUserItem.findOne(id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create PackUserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => PackUserItem)
  async createPackUserItem(
    @Arg('input') input: CreatePackUserItemInput
  ): Promise<PackUserItem> {
    return await PackUserItem.create(input).save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update PackUserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => PackUserItem)
  async updatePackUserItem(
    @Arg('id') id: number,
    @Arg('input') input: UpdatePackUserItemInput
  ): Promise<PackUserItem> {
    const packUserItem = await PackUserItem.findOne(id);
    await PackUserItem.merge(packUserItem, input);
    return await packUserItem.save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete PackUserItem
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deletePackUserItem(@Arg('id') id: number): Promise<Boolean> {
    const packUserItem = await PackUserItem.findOne(id);
    await packUserItem.remove();
    return true;
  }
}

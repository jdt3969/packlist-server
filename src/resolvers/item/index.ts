import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { Item } from '@/entities/Item';

import { CreateItemInput } from './types/CreateItemInput';
import { UpdateItemInput } from './types/UpdateItemInput';

import { Auth } from '@/middleware/Auth';

@Resolver(() => Item)
export class ItemResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all Item rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [Item])
  async items(): Promise<Item[]> {
    return Item.find();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get Item by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => Item)
  async item(@Arg('id') id: number): Promise<Item> {
    return Item.findOne(id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create Item
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Item)
  async createItem(@Arg('input') input: CreateItemInput): Promise<Item> {
    return await Item.create(input).save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update Item
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Item)
  async updateItem(
    @Arg('id') id: number,
    @Arg('input') input: UpdateItemInput
  ): Promise<Item> {
    const item = await Item.findOne(id);
    await Item.merge(item, input);
    return await item.save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete Item
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteItem(@Arg('id') id: number): Promise<Boolean> {
    const item = await Item.findOne(id);
    await item.remove();
    return true;
  }
}

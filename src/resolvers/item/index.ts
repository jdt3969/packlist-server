import { Brackets } from 'typeorm';
import {
  Resolver,
  ID,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { Item } from '@/entities/Item';

import { Auth } from '@/middleware/Auth';

import { getOne, create, update, destroy } from '@/utils/resolvers';

import { Context } from '@/types/Context';
import { CreateItemInput } from './types/CreateItemInput';
//import { UpdateItemInput } from './types/UpdateItemInput';
import { FindItemsInput } from './types/FindItemsInput';

@Resolver(() => Item)
export class ItemResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all Item rows
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Query(() => [Item])
  async items(
    @Arg('input') { search }: FindItemsInput,
    @Ctx() ctx: Context
  ): Promise<Item[]> {
    const qb = Item.createQueryBuilder('item')
      // Is an item the current user made or a system item
      .where(
        new Brackets((qb) => {
          qb.where('item.userId = :userId', { userId: ctx.user.id }).orWhere(
            'item.isSystem = TRUE'
          );
        })
      );

    // Filter by ILIKE
    if (search) {
      qb.andWhere('item.name ILIKE :search', { search: `%${search}%` });
    }

    return qb.getMany();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get Item by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => Item)
  async item(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Item> {
    return getOne<Item>(Item, id, ctx);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create Item
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Item)
  async createItem(
    @Arg('input') input: CreateItemInput,
    @Ctx() ctx: Context
  ): Promise<Item> {
    return create<Item>(Item, input, ctx, { addOwner: true });
  }

  /*
  //////////////////////////////////////////////////////////////////////////////
  // Update Item
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Item)
  async updateItem(
    @Arg('id', () => ID) id: number,
    @Arg('input') input: UpdateItemInput,
    @Ctx() ctx: Context
  ): Promise<Item> {
    return update<Item>(Item, id, input, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete Item
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteItem(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(Item, id, ctx, { isOwner: true });
  }
  */
}

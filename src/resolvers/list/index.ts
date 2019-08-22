import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { List } from '@/entities/List';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';

import { Context } from '@/types/Context';
import { CreateListInput } from './types/CreateListInput';
import { UpdateListInput } from './types/UpdateListInput';

@Resolver(() => List)
export class ListResolver {
  /*
  //////////////////////////////////////////////////////////////////////////////
  // Get all List rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [List])
  async lists(): Promise<List[]> {
    return getAll<List>(List);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get List by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => List)
  async list(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<List> {
    return getOne<List>(List, id, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create List
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => List)
  async createList(
    @Arg('input') input: CreateListInput,
    @Ctx() ctx: Context
  ): Promise<List> {
    return create<List>(List, input, ctx, { addOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update List
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => List)
  async updateList(
    @Arg('id') id: number,
    @Arg('input') input: UpdateListInput,
    @Ctx() ctx: Context
  ): Promise<List> {
    return update<List>(List, id, input, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete List
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteList(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(List, id, ctx, { isOwner: true });
  }
  */
}

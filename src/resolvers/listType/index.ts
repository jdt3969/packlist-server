import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { ListType } from '@/entities/ListType';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';

import { Context } from '@/types/Context';
import { CreateListTypeInput } from './types/CreateListTypeInput';
import { UpdateListTypeInput } from './types/UpdateListTypeInput';

@Resolver(() => ListType)
export class ListTypeResolver {
  /*
  //////////////////////////////////////////////////////////////////////////////
  // Get all ListType rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [ListType])
  async listTypes(): Promise<ListType[]> {
    return getAll<ListType>(ListType);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get ListType by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => ListType)
  async listType(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<ListType> {
    return getOne<ListType>(ListType, id, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create ListType
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => ListType)
  async createListType(
    @Arg('input') input: CreateListTypeInput,
    @Ctx() ctx: Context
  ): Promise<ListType> {
    return create<ListType>(ListType, input, ctx, { addOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update ListType
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => ListType)
  async updateListType(
    @Arg('id') id: number,
    @Arg('input') input: UpdateListTypeInput,
    @Ctx() ctx: Context
  ): Promise<ListType> {
    return update<ListType>(ListType, id, input, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete ListType
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteListType(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(ListType, id, ctx, { isOwner: true });
  }
  */
}

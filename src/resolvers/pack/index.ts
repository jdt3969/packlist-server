import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { Pack } from '@/entities/Pack';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';

import { Context } from '@/types/Context';
import { CreatePackInput } from './types/CreatePackInput';
import { UpdatePackInput } from './types/UpdatePackInput';

@Resolver(() => Pack)
export class PackResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all Pack rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [Pack])
  async packs(): Promise<Pack[]> {
    return getAll<Pack>(Pack);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get Pack by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => Pack)
  async pack(@Arg('id') id: number, @Ctx() ctx: Context): Promise<Pack> {
    return getOne<Pack>(Pack, id, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create Pack
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Pack)
  async createPack(
    @Arg('input') input: CreatePackInput,
    @Ctx() ctx: Context
  ): Promise<Pack> {
    return create<Pack>(Pack, input, ctx, { addOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update Pack
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Pack)
  async updatePack(
    @Arg('id') id: number,
    @Arg('input') input: UpdatePackInput,
    @Ctx() ctx: Context
  ): Promise<Pack> {
    return update<Pack>(Pack, id, input, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete Pack
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deletePack(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(Pack, id, ctx, { isOwner: true });
  }
}

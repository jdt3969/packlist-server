import {
  Resolver,
  ID,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { Pack } from '@/entities/Pack';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';
import { NotFoundError } from '@/utils/errors';

import { Context } from '@/types/Context';
import { CreatePackInput } from './types/CreatePackInput';
import { UpdatePackInput } from './types/UpdatePackInput';

@Resolver(() => Pack)
export class PackResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all Packs
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [Pack])
  async packs(
    @Arg('userId', () => ID, { nullable: true }) userId: number,
    @Ctx() ctx: Context
  ): Promise<Pack[]> {
    userId = userId || (ctx.user ? ctx.user.id : null);

    if (!userId) {
      throw NotFoundError('No user provided');
    }

    return getAll<Pack>(Pack, { where: { userId } });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get Pack by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => Pack)
  async pack(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Pack> {
    return getOne<Pack>(Pack, id, ctx);
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
    @Arg('id', () => ID) id: number,
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
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(Pack, id, ctx, { isOwner: true });
  }
}

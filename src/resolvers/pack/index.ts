import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { Pack } from '@/entities/Pack';

import { CreatePackInput } from './types/CreatePackInput';
import { UpdatePackInput } from './types/UpdatePackInput';

import { Auth } from '@/middleware/Auth';

@Resolver(() => Pack)
export class PackResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all Pack rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [Pack])
  async packs(): Promise<Pack[]> {
    return Pack.find();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get Pack by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => Pack)
  async pack(@Arg('id') id: number): Promise<Pack> {
    return Pack.findOne(id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create Pack
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Pack)
  async createPack(@Arg('input') input: CreatePackInput): Promise<Pack> {
    return await Pack.create(input).save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update Pack
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Pack)
  async updatePack(
    @Arg('id') id: number,
    @Arg('input') input: UpdatePackInput
  ): Promise<Pack> {
    const pack = await Pack.findOne(id);
    await Pack.merge(pack, input);
    return await pack.save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete Pack
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deletePack(@Arg('id') id: number): Promise<Boolean> {
    const pack = await Pack.findOne(id);
    await pack.remove();
    return true;
  }
}

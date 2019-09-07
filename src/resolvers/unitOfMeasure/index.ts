import {
  Resolver,
  ID,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { UnitOfMeasure } from '@/entities/UnitOfMeasure';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';

import { Context } from '@/types/Context';
import { CreateUnitOfMeasureInput } from './types/CreateUnitOfMeasureInput';
import { UpdateUnitOfMeasureInput } from './types/UpdateUnitOfMeasureInput';

@Resolver(() => UnitOfMeasure)
export class UnitOfMeasureResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all UnitOfMeasure rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [UnitOfMeasure])
  async unitOfMeasures(): Promise<UnitOfMeasure[]> {
    return getAll<UnitOfMeasure>(UnitOfMeasure);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get UnitOfMeasure by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => UnitOfMeasure)
  async unitOfMeasure(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<UnitOfMeasure> {
    return getOne<UnitOfMeasure>(UnitOfMeasure, id, ctx);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create UnitOfMeasure
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => UnitOfMeasure)
  async createUnitOfMeasure(
    @Arg('input') input: CreateUnitOfMeasureInput,
    @Ctx() ctx: Context
  ): Promise<UnitOfMeasure> {
    return create<UnitOfMeasure>(UnitOfMeasure, input, ctx);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update UnitOfMeasure
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => UnitOfMeasure)
  async updateUnitOfMeasure(
    @Arg('id', () => ID) id: number,
    @Arg('input') input: UpdateUnitOfMeasureInput,
    @Ctx() ctx: Context
  ): Promise<UnitOfMeasure> {
    return update<UnitOfMeasure>(UnitOfMeasure, id, input, ctx);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete UnitOfMeasure
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteUnitOfMeasure(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(UnitOfMeasure, id, ctx, { isOwner: true });
  }
}

import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { UnitOfMeasure } from '@/entities/UnitOfMeasure';

import { CreateUnitOfMeasureInput } from './types/CreateUnitOfMeasureInput';
import { UpdateUnitOfMeasureInput } from './types/UpdateUnitOfMeasureInput';

import { Auth } from '@/middleware/Auth';

@Resolver(() => UnitOfMeasure)
export class UnitOfMeasureResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all UnitOfMeasure rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [UnitOfMeasure])
  async unitOfMeasures(): Promise<UnitOfMeasure[]> {
    return UnitOfMeasure.find();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get UnitOfMeasure by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => UnitOfMeasure)
  async unitOfMeasure(@Arg('id') id: number): Promise<UnitOfMeasure> {
    return UnitOfMeasure.findOne(id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create UnitOfMeasure
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => UnitOfMeasure)
  async createUnitOfMeasure(
    @Arg('input') input: CreateUnitOfMeasureInput
  ): Promise<UnitOfMeasure> {
    return await UnitOfMeasure.create(input).save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update UnitOfMeasure
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => UnitOfMeasure)
  async updateUnitOfMeasure(
    @Arg('id') id: number,
    @Arg('input') input: UpdateUnitOfMeasureInput
  ): Promise<UnitOfMeasure> {
    const unitOfMeasure = await UnitOfMeasure.findOne(id);
    await UnitOfMeasure.merge(unitOfMeasure, input);
    return await unitOfMeasure.save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete UnitOfMeasure
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteUnitOfMeasure(@Arg('id') id: number): Promise<Boolean> {
    const unitOfMeasure = await UnitOfMeasure.findOne(id);
    await unitOfMeasure.remove();
    return true;
  }
}

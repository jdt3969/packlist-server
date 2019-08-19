import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { List } from '@/entities/List';

import { CreateListInput } from './types/CreateListInput';
import { UpdateListInput } from './types/UpdateListInput';

import { Auth } from '@/middleware/Auth';

@Resolver(() => List)
export class ListResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all List rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [List])
  async lists(): Promise<List[]> {
    return List.find();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get List by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => List)
  async list(@Arg('id') id: number): Promise<List> {
    return List.findOne(id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create List
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => List)
  async createList(@Arg('input') input: CreateListInput): Promise<List> {
    return await List.create(input).save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update List
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => List)
  async updateList(
    @Arg('id') id: number,
    @Arg('input') input: UpdateListInput
  ): Promise<List> {
    const list = await List.findOne(id);
    await List.merge(list, input);
    return await list.save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete List
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteList(@Arg('id') id: number): Promise<Boolean> {
    const list = await List.findOne(id);
    await list.remove();
    return true;
  }
}

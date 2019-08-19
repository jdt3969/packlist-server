import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { ListType } from '@/entities/ListType';

import { CreateListTypeInput } from './types/CreateListTypeInput';
import { UpdateListTypeInput } from './types/UpdateListTypeInput';

import { Auth } from '@/middleware/Auth';

@Resolver(() => ListType)
export class ListTypeResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all ListType rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [ListType])
  async listTypes(): Promise<ListType[]> {
    return ListType.find();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get ListType by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => ListType)
  async listType(@Arg('id') id: number): Promise<ListType> {
    return ListType.findOne(id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create ListType
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => ListType)
  async createListType(
    @Arg('input') input: CreateListTypeInput
  ): Promise<ListType> {
    return await ListType.create(input).save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update ListType
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => ListType)
  async updateListType(
    @Arg('id') id: number,
    @Arg('input') input: UpdateListTypeInput
  ): Promise<ListType> {
    const listType = await ListType.findOne(id);
    await ListType.merge(listType, input);
    return await listType.save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete ListType
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteListType(@Arg('id') id: number): Promise<Boolean> {
    const listType = await ListType.findOne(id);
    await listType.remove();
    return true;
  }
}

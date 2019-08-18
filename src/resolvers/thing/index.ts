import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  UseMiddleware,
} from 'type-graphql';

import { Context } from '@/types/Context';

import { Thing } from '@/entities/Thing';
import { User } from '@/entities/User';

import { CreateInput } from './types/CreateInput';

import { Auth } from '@/middleware/Auth';

@Resolver(() => Thing)
export class ThingResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get thing By id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => Thing)
  async thing(@Arg('id') id: number): Promise<Thing> {
    return Thing.findOne(id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get all things
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [Thing])
  async things(): Promise<Thing[]> {
    return Thing.find();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create Thing
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Thing)
  async createThing(
    @Arg('input') input: CreateInput,
    @Ctx() { user }: Context
  ): Promise<Thing> {
    return await Thing.create({ ...input, ownerId: user.id }).save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Owner resolution
  //////////////////////////////////////////////////////////////////////////////
  @FieldResolver()
  async owner(@Root() thing: Thing): Promise<User> {
    return await User.findOne(thing.ownerId);
  }
}

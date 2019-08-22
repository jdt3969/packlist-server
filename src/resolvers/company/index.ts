import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { Company } from '@/entities/Company';

import { Auth } from '@/middleware/Auth';

import { getAll, getOne, create, update, destroy } from '@/utils/resolvers';

import { Context } from '@/types/Context';
import { CreateCompanyInput } from './types/CreateCompanyInput';
import { UpdateCompanyInput } from './types/UpdateCompanyInput';

@Resolver(() => Company)
export class CompanyResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all Company rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [Company])
  async companies(): Promise<Company[]> {
    return getAll<Company>(Company);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get Company by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => Company)
  async company(@Arg('id') id: number, @Ctx() ctx: Context): Promise<Company> {
    return getOne<Company>(Company, id, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create Company
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Company)
  async createCompany(
    @Arg('input') input: CreateCompanyInput,
    @Ctx() ctx: Context
  ): Promise<Company> {
    return create<Company>(Company, input, ctx, { addOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update Company
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Company)
  async updateCompany(
    @Arg('id') id: number,
    @Arg('input') input: UpdateCompanyInput,
    @Ctx() ctx: Context
  ): Promise<Company> {
    return update<Company>(Company, id, input, ctx, { isOwner: true });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete Company
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteCompany(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(Company, id, ctx, { isOwner: true });
  }
}

import {
  Resolver,
  ID,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import { Brackets } from 'typeorm';

import { Company } from '@/entities/Company';

import { Auth } from '@/middleware/Auth';

import { getOne, create, update, destroy } from '@/utils/resolvers';

import { Context } from '@/types/Context';
import { CreateCompanyInput } from './types/CreateCompanyInput';
import { UpdateCompanyInput } from './types/UpdateCompanyInput';
import { FindCompaniesInput } from './types/FindCompaniesInput';

@Resolver(() => Company)
export class CompanyResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all Company rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [Company])
  async companies(
    @Arg('input') { search }: FindCompaniesInput,
    @Ctx() ctx: Context
  ): Promise<Company[]> {
    const qb = Company.createQueryBuilder('company')
      // Is company the current user made or a system company
      .where(
        new Brackets((qb) => {
          qb.where('company.userId = :userId', { userId: ctx.user.id }).orWhere(
            'company.isSystem = TRUE'
          );
        })
      );

    // Filter by ILIKE
    if (search) {
      qb.andWhere('company.name ILIKE :search', { search: `%${search}%` });
    }

    return qb.getMany();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get Company by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => Company)
  async company(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Company> {
    return getOne<Company>(Company, id, ctx);
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
    @Arg('id', () => ID) id: number,
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
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    return destroy(Company, id, ctx, { isOwner: true });
  }
}

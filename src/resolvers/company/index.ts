import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { Company } from '@/entities/Company';

import { CreateCompanyInput } from './types/CreateCompanyInput';
import { UpdateCompanyInput } from './types/UpdateCompanyInput';

import { Auth } from '@/middleware/Auth';

@Resolver(() => Company)
export class CompanyResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all Company rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [Company])
  async companies(): Promise<Company[]> {
    return Company.find();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get Company by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => Company)
  async company(@Arg('id') id: number): Promise<Company> {
    return Company.findOne(id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create Company
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Company)
  async createCompany(
    @Arg('input') input: CreateCompanyInput
  ): Promise<Company> {
    return await Company.create(input).save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update Company
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Company)
  async updateCompany(
    @Arg('id') id: number,
    @Arg('input') input: UpdateCompanyInput
  ): Promise<Company> {
    const company = await Company.findOne(id);
    await Company.merge(company, input);
    return await company.save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete Company
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => Boolean)
  async deleteCompany(@Arg('id') id: number): Promise<Boolean> {
    const company = await Company.findOne(id);
    await company.remove();
    return true;
  }
}

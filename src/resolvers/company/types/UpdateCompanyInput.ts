import { InputType, Field, ID } from 'type-graphql';

import { Company } from '@/entities/Company';

@InputType()
export class UpdateCompanyInput implements Partial<Company> {
  @Field({ nullable: true })
  name?: string;
}

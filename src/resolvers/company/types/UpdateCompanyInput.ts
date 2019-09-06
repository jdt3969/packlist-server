import { InputType, Field } from 'type-graphql';

import { Company } from '@/entities/Company';

@InputType()
export class UpdateCompanyInput implements Partial<Company> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  imageUrl?: string;
}

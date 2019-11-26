import { InputType, Field } from 'type-graphql';

import { Company } from '@/entities/Company';

@InputType()
export class CreateCompanyInput implements Partial<Company> {
  @Field()
  name: string;

  @Field({ nullable: true })
  url: string;

  @Field({ nullable: true })
  imageUrl: string;
}

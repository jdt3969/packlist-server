import { InputType, Field } from 'type-graphql';

@InputType()
export class FindCompaniesInput {
  @Field({ nullable: true })
  search?: string;
}

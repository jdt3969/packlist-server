import { InputType, Field } from 'type-graphql';

import { Category } from '@/entities/Category';

@InputType()
export class UpdateCategoryInput implements Partial<Category> {
  @Field({ nullable: true })
  name?: string;
}

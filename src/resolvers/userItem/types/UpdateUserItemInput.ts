import { InputType, Field, ID } from 'type-graphql';

import { UserItem } from '@/entities/UserItem';

@InputType()
export class UpdateUserItemInput implements Partial<UserItem> {
  @Field({ nullable: true })
  name?: string;
}

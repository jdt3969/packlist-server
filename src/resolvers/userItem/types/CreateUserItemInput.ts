import { InputType, Field } from 'type-graphql';

import { UserItem } from '@/entities/UserItem';

@InputType()
export class CreateUserItemInput implements Partial<UserItem> {
  @Field()
  name: string;
}

import { InputType, Field, ID, Int } from 'type-graphql';

import { UserItem } from '@/entities/UserItem';

@InputType()
export class UpdateUserItemInput implements Partial<UserItem> {
  @Field({ nullable: true })
  isOwned?: boolean;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  weight?: number;
}

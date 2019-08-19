import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { UserItem } from './UserItem';
import { List } from './List';

@ObjectType()
@Entity()
export class ListUserItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => UserItem)
  @ManyToOne(() => UserItem, (userItem: UserItem) => userItem.listUserItems)
  userItem: UserItem;

  @Field(() => List)
  @ManyToOne(() => List, (list: List) => list.listUserItems)
  list: List;
}

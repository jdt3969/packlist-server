import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  Column,
} from 'typeorm';
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
  @Column()
  userItemId: number;

  @Field(() => List)
  @ManyToOne(() => List, (list: List) => list.listUserItems)
  list: List;
  @Column()
  listId: number;
}

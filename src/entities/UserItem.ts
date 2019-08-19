import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { User } from './User';
import { Item } from './Item';
import { Category } from './Category';
import { PackUserItem } from './PackUserItem';
import { ListUserItem } from './ListUserItem';

@ObjectType()
@Entity()
export class UserItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.userItems)
  user: User;

  @Field(() => Item)
  @ManyToOne(() => Item, (item: Item) => item.userItems)
  item: Item;

  @Field(() => Category)
  @ManyToOne(() => Category, (category: Category) => category.userItems)
  category: Category;

  @Field(() => [PackUserItem])
  @OneToMany(
    () => PackUserItem,
    (packUserItem: PackUserItem) => packUserItem.userItem
  )
  packUserItems: PackUserItem[];

  @Field(() => [ListUserItem])
  @OneToMany(
    () => ListUserItem,
    (listUserItem: ListUserItem) => listUserItem.userItem
  )
  listUserItems: ListUserItem[];
}

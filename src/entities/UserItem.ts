import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  OneToMany,
  Column,
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
  @Column()
  userId: number;

  @Field(() => Item)
  @ManyToOne(() => Item, (item: Item) => item.userItems)
  item: Item;
  @Column()
  itemId: number;

  @Field(() => Category)
  @ManyToOne(() => Category, (category: Category) => category.userItems)
  category: Category;
  @Column()
  categoryId: number;

  @OneToMany(
    () => PackUserItem,
    (packUserItem: PackUserItem) => packUserItem.userItem
  )
  packUserItems: PackUserItem[];

  @OneToMany(
    () => ListUserItem,
    (listUserItem: ListUserItem) => listUserItem.userItem
  )
  listUserItems: ListUserItem[];
}

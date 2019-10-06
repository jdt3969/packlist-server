import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  OneToMany,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { User } from './User';
import { Item } from './Item';
import { Category } from './Category';
import { PackItem } from './PackItem';

import { Lazy } from '@/types/Lazy';

@ObjectType()
@Entity()
export class UserItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  isOwned: boolean;

  @ManyToOne(() => User, (user: User) => user.userItems)
  user: User;
  @Column()
  userId: number;

  @ManyToMany(() => Category, (category: Category) => category.userItems)
  @JoinTable()
  categories: Category[];

  @Field(() => Item)
  @ManyToOne(() => Item, (item: Item) => item.userItems, { lazy: true })
  item: Lazy<Item>;
  @Column()
  itemId: number;

  @OneToMany(() => PackItem, (packItem: PackItem) => packItem.userItem)
  packItems: PackItem[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { User } from './User';
import { UserItem } from './UserItem';
import { PackCategory } from './PackCategory';

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @ManyToOne(
    () => User,
    (user: User) => user.categories
  )
  user: User;
  @Column()
  userId: number;

  @Field(() => UserItem)
  @ManyToMany(
    () => UserItem,
    (userItem: UserItem) => userItem.categories
  )
  userItems: UserItem[];

  @OneToMany(
    () => PackCategory,
    (packCategory: PackCategory) => packCategory.category
  )
  packCategories: PackCategory[];
}

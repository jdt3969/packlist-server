import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { User } from './User';
import { UserItem } from './UserItem';

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.categories)
  user: User;

  @Field(() => [UserItem])
  @OneToMany(() => UserItem, (userItem: UserItem) => userItem.category)
  userItems: UserItem[];
}

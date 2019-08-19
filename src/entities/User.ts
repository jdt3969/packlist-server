import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, Root } from 'type-graphql';

import { Category } from './Category';
import { UserItem } from './UserItem';
import { Pack } from './Pack';
import { List } from './List';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Field(() => [Category])
  @OneToMany(() => Category, (category: Category) => category.user)
  categories: Category[];

  @Field(() => [UserItem])
  @OneToMany(() => UserItem, (userItem: UserItem) => userItem.user)
  userItems: UserItem[];

  @Field(() => [Pack])
  @OneToMany(() => Pack, (pack: Pack) => pack.user)
  packs: Pack[];

  @Field(() => [List])
  @OneToMany(() => List, (list: List) => list.user)
  lists: List[];
}

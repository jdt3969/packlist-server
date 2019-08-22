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
import { ListType } from './ListType';
import { ListUserItem } from './ListUserItem';

@ObjectType()
@Entity()
export class List extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @ManyToOne(() => User, (user: User) => user.lists)
  user: User;
  @Column()
  userId: number;

  @Field(() => ListType)
  @ManyToOne(() => ListType, (listType: ListType) => listType.lists)
  listType: ListType;
  @Column()
  listTypeId: number;

  @Field(() => [ListUserItem])
  @OneToMany(
    () => ListUserItem,
    (listUserItem: ListUserItem) => listUserItem.list
  )
  listUserItems: ListUserItem[];
}

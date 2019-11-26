import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Item } from './Item';
import { User } from './User';

import { Lazy } from 'Lazy';

@ObjectType()
@Entity()
export class Company extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ nullable: true })
  url: string;

  @Field()
  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: false })
  isSystem: boolean;

  @ManyToOne(
    () => User,
    (user: User) => user.items,
    { lazy: true }
  )
  user: Lazy<User>;
  @Column()
  userId: number;

  @OneToMany(
    () => Item,
    (item: Item) => item.company
  )
  items: Item[];
}

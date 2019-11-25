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
import { ObjectType, Field, ID, Int } from 'type-graphql';

import { User } from './User';
import { Item } from './Item';
import { Category } from './Category';
import { PackItem } from './PackItem';

import { UnitOfMeasure } from '@/enums/UnitOfMeasure';

import { Lazy } from '@/types/Lazy';

@ObjectType()
@Entity()
export class UserItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ default: true })
  isOwned?: boolean;

  @Field(() => Int, { nullable: true })
  @Column('int', { nullable: true })
  price: number;

  @Field({ nullable: true })
  @Column('decimal', { nullable: true })
  weight: number;

  @Field(() => UnitOfMeasure)
  @Column({
    type: 'enum',
    enum: UnitOfMeasure,
    default: UnitOfMeasure.GRAM,
  })
  unitOfMeasure: UnitOfMeasure;

  @ManyToOne(
    () => User,
    (user: User) => user.userItems
  )
  user: User;
  @Column()
  userId: number;

  @Field(() => Item)
  @ManyToOne(
    () => Item,
    (item: Item) => item.userItems,
    { lazy: true }
  )
  item: Lazy<Item>;
  @Column()
  itemId: number;

  @ManyToMany(
    () => Category,
    (category: Category) => category.userItems
  )
  @JoinTable()
  categories: Category[];

  @OneToMany(
    () => PackItem,
    (packItem: PackItem) => packItem.userItem
  )
  packItems: PackItem[];
}

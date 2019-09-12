import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { UserItem } from './UserItem';
import { PackCategory } from './PackCategory';

import { Lazy } from '@/types/Lazy';

@ObjectType()
@Entity()
export class PackItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  isWorn: boolean;

  @Field(() => Int)
  @Column('int', { default: 1 })
  quantity: number;

  @Field(() => UserItem)
  @ManyToOne(() => UserItem, (userItem: UserItem) => userItem.packItems, {
    lazy: true,
  })
  userItem: Lazy<UserItem>;
  @Column()
  userItemId: number;

  @ManyToOne(
    () => PackCategory,
    (packCategory: PackCategory) => packCategory.packItems
  )
  packCategory: PackCategory;
  @Column()
  packCategoryId: number;
}

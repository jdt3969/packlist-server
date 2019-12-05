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
import { uniqBy } from 'lodash';

import { User } from './User';
import { Item } from './Item';
import { Category } from './Category';
import { PackItem } from './PackItem';

import { UnitOfMeasure } from '@/enums/UnitOfMeasure';
import { CreateItemInput } from '@/resolvers/item/types/CreateItemInput';
import { NotFoundError } from '@/utils/errors';

import { Lazy } from '@/types/Lazy';

@ObjectType()
@Entity()
export class UserItem extends BaseEntity {
  //////////////////////////////////////////////////////////////////////////////
  // Columns
  //////////////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////////////
  // Relational Columns
  //////////////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////////////
  // Many-To-Many
  //////////////////////////////////////////////////////////////////////////////
  @ManyToMany(
    () => Category,
    (category: Category) => category.userItems
  )
  @JoinTable()
  categories: Category[];

  //////////////////////////////////////////////////////////////////////////////
  // One-To-Many
  //////////////////////////////////////////////////////////////////////////////
  @OneToMany(
    () => PackItem,
    (packItem: PackItem) => packItem.userItem
  )
  packItems: PackItem[];

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  static async upsertWithCategory({
    userId,
    itemId,
    itemInput,
    category,
  }: {
    userId: number;
    itemId?: number;
    itemInput?: CreateItemInput;
    category: Category;
  }) {
    const item = await (itemId
      ? Item.findOne(itemId)
      : Item.create({ ...itemInput, userId }).save());

    if (!item) {
      throw NotFoundError(`Item ${itemId}`);
    }

    itemId = item.id;

    let userItem = await UserItem.findOne(
      { itemId, userId },
      { relations: ['categories'] }
    );

    if (!userItem) {
      userItem = await UserItem.create({ itemId, userId });
      userItem.categories = [category];
    } else {
      const categories = await userItem.categories;
      userItem.categories = uniqBy([...categories, category], 'id');
    }

    return userItem.save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Instance Methods
  //////////////////////////////////////////////////////////////////////////////
}

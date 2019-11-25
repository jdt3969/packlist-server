import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';

import { Company } from './Company';
import { UserItem } from './UserItem';
import { ShoppingLink } from './ShoppingLink';

import { UnitOfMeasure } from '@/enums/UnitOfMeasure';

import { Lazy } from '@/types/Lazy';

@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Index()
  @Column()
  name: string;

  @Field(() => Int)
  @Column('int')
  price: number;

  @Field()
  @Column('decimal')
  weight: number;

  @Field(() => UnitOfMeasure)
  @Column({
    type: 'enum',
    enum: UnitOfMeasure,
    default: UnitOfMeasure.GRAM,
  })
  unitOfMeasure: UnitOfMeasure;

  @Field()
  @Column()
  imageUrl: string;

  @Field(() => Company)
  @ManyToOne(
    () => Company,
    (company: Company) => company.items,
    { lazy: true }
  )
  company: Lazy<Company>;
  @Column()
  companyId: number;

  @OneToMany(
    () => UserItem,
    (userItem: UserItem) => userItem.item
  )
  userItems: UserItem[];

  @Field(() => [ShoppingLink])
  @OneToMany(
    () => ShoppingLink,
    (shoppingLink: ShoppingLink) => shoppingLink.item,
    { lazy: true }
  )
  shoppingLinks: Lazy<ShoppingLink[]>;
}

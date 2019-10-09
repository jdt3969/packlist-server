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
import { UnitOfMeasure } from './UnitOfMeasure';
import { UserItem } from './UserItem';
import { ShoppingLink } from './ShoppingLink';

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

  @Field()
  @Column()
  imageUrl: string;

  @Field(() => Company)
  @ManyToOne(() => Company, (company: Company) => company.items, { lazy: true })
  company: Lazy<Company>;
  @Column()
  companyId: number;

  @Field(() => UnitOfMeasure)
  @ManyToOne(
    () => UnitOfMeasure,
    (unitOfMeasure: UnitOfMeasure) => unitOfMeasure.items,
    { lazy: true }
  )
  unitOfMeasure: Lazy<UnitOfMeasure>;
  @Column()
  unitOfMeasureId: number;

  @OneToMany(() => UserItem, (userItem: UserItem) => userItem.item)
  userItems: UserItem[];

  @Field(() => [ShoppingLink])
  @OneToMany(
    () => ShoppingLink,
    (shoppingLink: ShoppingLink) => shoppingLink.item,
    { lazy: true }
  )
  shoppingLinks: Lazy<ShoppingLink[]>;
}

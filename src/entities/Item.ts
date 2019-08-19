import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Company } from './Company';
import { UnitOfMeasure } from './UnitOfMeasure';
import { UserItem } from './UserItem';
import { ShoppingLink } from './ShoppingLink';

@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column('decimal')
  weight: number;

  @Field()
  @Column()
  imageUrl: string;

  @Field(() => Company)
  @ManyToOne(() => Company, (company: Company) => company.items)
  company: Company;

  @Field(() => UnitOfMeasure)
  @ManyToOne(
    () => UnitOfMeasure,
    (unitOfMeasure: UnitOfMeasure) => unitOfMeasure.items
  )
  unitOfMeasure: UnitOfMeasure;

  @Field(() => [UserItem])
  @OneToMany(() => UserItem, (userItem: UserItem) => userItem.item)
  userItems: UserItem[];

  @Field(() => [ShoppingLink])
  @OneToMany(
    () => ShoppingLink,
    (shoppingLink: ShoppingLink) => shoppingLink.item
  )
  shoppingLinks: ShoppingLink[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  Column,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Item } from './Item';

@ObjectType()
@Entity()
export class ShoppingLink extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  url: string;

  @Field(() => Item)
  @ManyToOne(() => Item, (item: Item) => item.shoppingLinks)
  item: Item;
}

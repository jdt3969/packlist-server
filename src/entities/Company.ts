import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Item } from './Item';

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
  @Column()
  url: string;

  @Field(() => [Item])
  @OneToMany(() => Item, (item: Item) => item.company)
  items: Item[];
}

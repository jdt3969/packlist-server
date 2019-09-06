import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Pack } from './Pack';
import { Category } from './Category';
import { PackItem } from './PackItem';

@ObjectType()
@Entity()
export class PackCategory extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pack, (pack: Pack) => pack.packCategories)
  pack: Pack;
  @Column()
  packId: number;

  @ManyToOne(() => Category, (category: Category) => category.packCategories)
  category: Category;
  @Column()
  categoryId: number;

  @Field(() => [PackItem])
  @OneToMany(() => PackItem, (packItem: PackItem) => packItem.packCategory)
  packItems: PackItem[];
}

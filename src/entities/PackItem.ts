import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { UserItem } from './UserItem';
import { PackCategory } from './PackCategory';

@ObjectType()
@Entity()
export class PackItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  isWorn: boolean;

  @Field(() => UserItem)
  @ManyToOne(() => UserItem, (userItem: UserItem) => userItem.packItems)
  userItem: UserItem;
  @Column()
  userItemId: number;

  @Field(() => PackCategory)
  @ManyToOne(
    () => PackCategory,
    (packCategory: PackCategory) => packCategory.packItems
  )
  packCategory: PackCategory;
  @Column()
  packCategoryId: number;
}

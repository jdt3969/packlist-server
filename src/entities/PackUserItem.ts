import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  Column,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { UserItem } from './UserItem';
import { Pack } from './Pack';

@ObjectType()
@Entity()
export class PackUserItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ default: false })
  isWorn: boolean;

  @Field(() => UserItem)
  @ManyToOne(() => UserItem, (userItem: UserItem) => userItem.packUserItems)
  userItem: UserItem;
  @Column()
  userItemId: number;

  @Field(() => Pack)
  @ManyToOne(() => Pack, (pack: Pack) => pack.packUserItems)
  pack: Pack;
  @Column()
  packId: number;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { User } from './User';
import { PackUserItem } from './PackUserItem';

@ObjectType()
@Entity()
export class Pack extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  isPrivate: boolean;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.packs)
  user: User;

  @Field(() => [PackUserItem])
  @OneToMany(
    () => PackUserItem,
    (packUserItem: PackUserItem) => packUserItem.pack
  )
  packUserItems: PackUserItem[];
}

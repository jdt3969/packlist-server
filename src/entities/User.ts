import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, Root } from 'type-graphql';

import { Category } from './Category';
import { UserItem } from './UserItem';
import { Pack } from './Pack';
import { PackItem } from './PackItem';

import { Lazy } from '@/types/Lazy';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Field()
  @Column({ default: '' })
  firstName: string;

  @Field()
  @Column({ default: '' })
  lastName: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Field(() => [Pack])
  @OneToMany(() => Pack, (pack: Pack) => pack.user, { lazy: true })
  packs: Lazy<Pack[]>;

  @OneToMany(() => Category, (category: Category) => category.user)
  categories: Category[];

  @OneToMany(() => UserItem, (userItem: UserItem) => userItem.user)
  userItems: UserItem[];

  @OneToMany(() => PackItem, (packItem: PackItem) => packItem.user)
  packItems: PackItem[];
}

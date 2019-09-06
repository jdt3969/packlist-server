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
import { PackCategory } from './PackCategory';

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
  @Column()
  userId: number;

  @Field(() => [PackCategory])
  @OneToMany(
    () => PackCategory,
    (packCategory: PackCategory) => packCategory.pack
  )
  packCategories: PackCategory[];
}

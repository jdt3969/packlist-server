import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { ObjectType, Field, ID, UseMiddleware } from 'type-graphql';

import { Auth, isOwner } from '@/middleware/Auth';
import { User } from './User';

@ObjectType()
@Entity()
export class Thing extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @UseMiddleware(Auth(isOwner))
  @Field()
  @Column()
  name: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.things)
  owner: User;
  @Field(() => ID)
  @Column()
  ownerId: number;
}

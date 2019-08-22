import { ClassType } from 'type-graphql';
import { BaseEntity } from 'typeorm';

export interface BaseEntityWithUser extends BaseEntity {
  userId: number;
}

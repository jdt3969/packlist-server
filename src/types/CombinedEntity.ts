import { ClassType } from 'type-graphql';
import { BaseEntity } from 'typeorm';

type BaseEntityType = typeof BaseEntity;

export interface CombinedEntity extends ClassType, BaseEntityType {}

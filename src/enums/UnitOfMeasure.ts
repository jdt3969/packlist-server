import { registerEnumType } from 'type-graphql';

export enum UnitOfMeasure {
  GRAM = 'gram',
}

export function register() {
  registerEnumType(UnitOfMeasure, { name: 'UnitOfMeasure' });
}

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '@/entities/User';

////////////////////////////////////////////////////////////////////////////////
// Email Already Exists
////////////////////////////////////////////////////////////////////////////////
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  defaultMessage() {
    return 'Email ($value) already in use';
  }

  validate(email: string) {
    return User.findOne({ where: { email } }).then((user) => !user);
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}

import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';

import { IsEmailAlreadyExist } from '@/utils/validators';

@InputType()
export class RegisterInput {
  /*
  @Field()
  @Length(1, 30)
  firstName: string;

  @Field()
  @Length(1, 30)
  lastName: string;
  */

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist()
  email: string;

  @Field()
  password: string;
}

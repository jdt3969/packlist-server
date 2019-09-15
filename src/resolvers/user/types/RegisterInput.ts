import { IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';

import { IsEmailAlreadyExist } from '@/utils/validators';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @IsEmailAlreadyExist()
  email: string;

  @Field()
  password: string;
}

import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from '@/entities/User';

import { sign } from '@/utils/jwt';

import { RegisterInput } from './types/RegisterInput';
import { LoginInput } from './types/LoginInput';
import { LoginSuccess } from './types/LoginSuccess';

@Resolver()
export class UserResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get User By Id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => User)
  async user(@Arg('id') id: number) {
    const user = await User.findOne(id);

    return user;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Login
  //////////////////////////////////////////////////////////////////////////////
  @Mutation(() => LoginSuccess)
  async login(@Arg('input') { email, password }: LoginInput): Promise<
    LoginSuccess
  > {
    const user = await User.findOne({ email });

    if (!user) {
      return { user: null, token: null, success: false };
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return { user: null, token: null, success: false };
    }

    const token = sign(user);

    return { user, token, success: true };
  }

  //////////////////////////////////////////////////////////////////////////////
  // Register
  //////////////////////////////////////////////////////////////////////////////
  @Mutation(() => User)
  async register(@Arg('input')
  {
    firstName,
    lastName,
    email,
    password,
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}

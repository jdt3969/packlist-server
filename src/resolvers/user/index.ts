import { Resolver, ID, Query, Mutation, Arg } from 'type-graphql';
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
  async user(@Arg('id', () => ID) id: number) {
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
      throw new Error('Email or password was incorrect');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Email or password was incorrect');
    }

    const token = sign(user);

    return { user, token };
  }

  //////////////////////////////////////////////////////////////////////////////
  // Register
  //////////////////////////////////////////////////////////////////////////////
  @Mutation(() => LoginSuccess)
  async register(@Arg('input')
  {
    email,
    password,
  }: RegisterInput): Promise<LoginSuccess> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
    }).save();

    const token = sign(user);

    return { user, token };
  }
}

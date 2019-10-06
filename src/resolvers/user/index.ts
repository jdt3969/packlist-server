import {
  Resolver,
  ID,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from '@/entities/User';

import { sign } from '@/utils/jwt';
import { getOne, update } from '@/utils/resolvers';
import { InvalidCredentialsError } from '@/utils/errors';

import { Auth } from '@/middleware/Auth';

import { RegisterInput } from './types/RegisterInput';
import { LoginInput } from './types/LoginInput';
import { LoginSuccess } from './types/LoginSuccess';
import { UpdateUserInput } from './types/UpdateUserInput';
import { Context } from '@/types/Context';

@Resolver()
export class UserResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get User By Id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => User)
  async user(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<User> {
    return getOne<User>(User, id, ctx);
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
      throw InvalidCredentialsError();
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw InvalidCredentialsError();
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

  //////////////////////////////////////////////////////////////////////////////
  // Update User
  //////////////////////////////////////////////////////////////////////////////
  @UseMiddleware(Auth())
  @Mutation(() => User)
  async updateUser(
    @Arg('input') input: UpdateUserInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    return update<User>(User, ctx.user.id, input, ctx, {
      isOwner: true,
      getOwnerId: (user) => user.id,
    });
  }
}

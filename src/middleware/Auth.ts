import { MiddlewareFn } from 'type-graphql';

import { NotAuthorizedError } from '@/utils/errors';

import { Context } from '@/types/Context';
import { AuthenticationFn } from '@/types/AuthenticationFn';

export const Auth: (...args: AuthenticationFn[]) => MiddlewareFn<Context> = (
  ...authenticatorFns
) => async ({ context: { user }, root, args }, next) => {
  // Bare minimum we require the requesting user be authenticated
  if (!user) {
    throw NotAuthorizedError();
  }

  authenticatorFns.forEach((authenticatorFn) => {
    if (!authenticatorFn({ activeUser: user, root, args })) {
      throw NotAuthorizedError();
    }
  });

  return next();
};

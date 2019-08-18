import { MiddlewareFn } from 'type-graphql';

import { Context } from '@/types/Context';
import { AuthenticationFn } from '@/types/AuthenticationFn';

const failMsg = 'You do not have access';

export const Auth: (...args: AuthenticationFn[]) => MiddlewareFn<Context> = (
  ...authenticatorFns
) => async ({ context: { user }, root, args }, next) => {
  // Bare minimum we require the requesting user be authenticated
  if (!user) {
    throw new Error(failMsg);
  }

  authenticatorFns.forEach((authenticatorFn) => {
    if (!authenticatorFn({ activeUser: user, root, args })) {
      throw new Error(failMsg);
    }
  });

  return next();
};

export const isOwner: AuthenticationFn = ({ activeUser, root }) => {
  if (!root || !root.ownerId) {
    console.error(
      'isOwner should only be used on the field of an object with an ownerId'
    );
    return false;
  }
  return activeUser.id === root.ownerId;
};

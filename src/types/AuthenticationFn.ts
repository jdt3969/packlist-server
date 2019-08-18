import { ArgsDictionary } from 'type-graphql';

import { User } from '@/entities/User';

export type AuthenticationFn = (opts: {
  activeUser: User;
  root: any;
  args: ArgsDictionary;
}) => boolean;

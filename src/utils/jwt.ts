import jwt from 'jsonwebtoken';
import fs from 'fs';
import { Handler, Request } from 'express';

import { User } from '@/entities/User';

declare module 'express' {
  interface Request {
    user: User;
  }
}

const jwtPrivateKey = fs.readFileSync('jwtRS256.key', 'utf8');
const jwtPublicKey = fs.readFileSync('jwtRS256.key.pub', 'utf8');

export const sign = (user: User) => {
  return jwt.sign({ user }, jwtPrivateKey, {
    algorithm: 'RS256',
    expiresIn: '30d',
  });
};

export const verify = (token: string): { user: User } => {
  if (!token) return null;

  try {
    return jwt.verify(token, jwtPublicKey, { algorithms: ['RS256'] }) as {
      user: User;
    };
  } catch (e) {
    return null;
  }
};

export const handler: Handler = async (req: Request, res, next) => {
  const token = req.get('authorization');

  const data = verify(token);

  if (data) {
    const user = await User.findOne(data.user.id);

    if (user) {
      req.user = user;
    }
  }

  next();
};

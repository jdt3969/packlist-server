import { Context } from '@/types/Context';
import { BaseEntityWithUser } from '@/types/Entity';
import { NotAuthorizedError } from './errors';

export function requireIsOwner(ctx: Context, entity: BaseEntityWithUser) {
  const userId = (ctx.user || {}).id;
  const ownerId = entity.userId;

  if (userId !== ownerId) {
    throw NotAuthorizedError();
  }
}

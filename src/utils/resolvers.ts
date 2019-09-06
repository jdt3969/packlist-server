import { BaseEntity } from 'typeorm';
import { Context } from '@/types/Context';
import { BaseEntityWithUser } from '@/types/Entity';

////////////////////////////////////////////////////////////////////////////////
// Option Types
////////////////////////////////////////////////////////////////////////////////
type IsOwnerOption = {
  isOwner?: boolean;
};

type AddOwnerOption = {
  addOwner?: boolean;
};

////////////////////////////////////////////////////////////////////////////////
// Get All
////////////////////////////////////////////////////////////////////////////////
type GetAll = <T>(Entity: any) => Promise<T[]>;
export const getAll: GetAll = async (Entity) => {
  return Entity.find();
};

////////////////////////////////////////////////////////////////////////////////
// Get One
////////////////////////////////////////////////////////////////////////////////
type GetOneOptions = IsOwnerOption;
type GetOne = <T>(
  Entity: any,
  id: number,
  ctx?: Context,
  options?: GetOneOptions
) => Promise<T>;
export const getOne: GetOne = async (Entity, id, ctx, options = {}) => {
  const entity = await Entity.findOne(id);

  if (!entity) throw new Error('Does not exist');
  if (options.isOwner && (entity as BaseEntityWithUser).userId !== ctx.user.id)
    throw new Error('You do not have access');

  return entity;
};

////////////////////////////////////////////////////////////////////////////////
// Create
////////////////////////////////////////////////////////////////////////////////
type CreateOptions = AddOwnerOption;
type Create = <T>(
  Entity: any,
  input: Partial<T>,
  ctx?: Context,
  options?: CreateOptions
) => Promise<T>;
export const create: Create = async (Entity, input, ctx, options = {}) => {
  const data = {
    ...input,
    ...(options.addOwner ? { userId: ctx.user.id } : {}),
  };

  return await Entity.create(data).save();
};

////////////////////////////////////////////////////////////////////////////////
// Update
////////////////////////////////////////////////////////////////////////////////
type UpdateOptions = IsOwnerOption;
type Update = <T>(
  Entity: any,
  id: number,
  input: Partial<T>,
  ctx?: Context,
  options?: UpdateOptions
) => Promise<T>;
export const update: Update = async (Entity, id, input, ctx, options = {}) => {
  const entity = await Entity.findOne(id);

  if (!entity) throw new Error('Does not exist');
  if (options.isOwner && (entity as BaseEntityWithUser).userId !== ctx.user.id)
    throw new Error('You do not have access');

  await Entity.merge(entity, input);
  return await entity.save();
};

////////////////////////////////////////////////////////////////////////////////
// Destroy
////////////////////////////////////////////////////////////////////////////////
type DestroyOptions = IsOwnerOption;
type Destroy = (
  Entity: any,
  id: number,
  ctx?: Context,
  options?: DestroyOptions
) => Promise<Boolean>;
export const destroy: Destroy = async (Entity, id, ctx, options = {}) => {
  const entity = await Entity.findOne(id);

  if (!entity) throw new Error('Does not exist');
  if (options.isOwner && (entity as BaseEntityWithUser).userId !== ctx.user.id)
    throw new Error('You do not have access');

  await entity.remove();
  return true;
};

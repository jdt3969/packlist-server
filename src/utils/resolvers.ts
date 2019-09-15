import { Context } from '@/types/Context';
import { BaseEntityWithUser } from '@/types/Entity';
////////////////////////////////////////////////////////////////////////////////
// Option Types
////////////////////////////////////////////////////////////////////////////////
type IsOwnerOption = {
  isOwner?: boolean;
  getOwnerId?: (entity: any) => Promise<number> | number;
};

type AddOwnerOption = {
  addOwner?: boolean;
};

type AllOptions = IsOwnerOption & AddOwnerOption;
////////////////////////////////////////////////////////////////////////////////
// Validate
////////////////////////////////////////////////////////////////////////////////
type ValidateOwner = (
  entity: any,
  userId: number,
  options?: AllOptions
) => void;
const validateOwner: ValidateOwner = async (entity, userId, options = {}) => {
  const ownerId = (await options.getOwnerId)
    ? options.getOwnerId(entity)
    : (entity as BaseEntityWithUser).userId;

  console.log('Requestor', userId);
  console.log('Owner:', ownerId);

  if (ownerId !== userId) {
    throw new Error('You do not have access');
  }
};
type Validate = (entity: any, ctx?: Context, options?: AllOptions) => void;
const validate: Validate = async (entity, ctx, options) => {
  if (!entity) {
    throw new Error('Does not exist');
  }

  if (options.isOwner) {
    await validateOwner(entity, ctx.user.id, options);
  }
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

  await validate(entity, ctx, options);

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

  await validate(entity, ctx, options);

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

  await validate(entity, ctx, options);

  await entity.remove();

  return true;
};

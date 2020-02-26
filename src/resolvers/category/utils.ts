import { Category } from '@/entities/Category';

export async function getCategories({
  userId,
}: {
  userId: number;
}): Promise<Category[]> {
  return Category.createQueryBuilder('category')
    .leftJoinAndSelect('category.userItems', 'user_item')
    .where('category.userId = :userId', { userId })
    .getMany();
}

export async function getCategoriesByUserItem({
  userId,
  userItemId,
}: {
  userId: number;
  userItemId: number;
}): Promise<Category[]> {
  return Category.createQueryBuilder('category')
    .leftJoinAndSelect('category.userItems', 'user_item')
    .where('category.userId = :userId', { userId })
    .andWhere('user_item.id = :userItemId', { userItemId })
    .getMany();
}

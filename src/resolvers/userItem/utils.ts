import { UserItem } from '@/entities/UserItem';

export async function getUserItemsByCategory({
  userId,
  categoryId,
}: {
  userId: number;
  categoryId: number;
}): Promise<UserItem[]> {
  return UserItem.createQueryBuilder('user_item')
    .leftJoinAndSelect('user_item.categories', 'category')
    .where('user_item.userId = :userId', { userId })
    .where('category.id = :categoryId', { categoryId })
    .getMany();
}

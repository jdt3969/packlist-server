import { Category } from '@/entities/Category';

export async function getCategories({
  userId,
  isOwned,
}: {
  userId: number;
  isOwned: boolean;
}): Promise<Category[]> {
  return Category.createQueryBuilder('category')
    .leftJoinAndSelect('category.userItems', 'user_item')
    .where('category.userId = :userId', { userId })
    .andWhere('user_item.isOwned = :isOwned', { isOwned })
    .getMany();
}

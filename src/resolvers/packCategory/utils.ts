import { PackCategory } from '@/entities/PackCategory';

export function formatCategoryName(name: string): string {
  return name;
}

// Using query builder until the commented code becomes typeORM feature
// https://github.com/typeorm/typeorm/issues/2707
export async function findPackCategory({
  packId,
  name,
}: {
  packId: number;
  name: string;
}): Promise<PackCategory> {
  /*
      const packCategories = await PackCategory.find({
      where: { packId, category: { where: { name: categoryName } } },
    });
    */
  return PackCategory.createQueryBuilder('pack_category')
    .innerJoin('pack_category.category', 'category')
    .where('pack_category.packId= :packId', { packId })
    .andWhere('category.name= :name', { name })
    .getOne();
}

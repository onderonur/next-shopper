import { routes } from '@/core/routing/utils';
import { CategoryLink } from '@/features/categories/components/category-link';
import { getManyCategories } from '@/features/categories/data';

export async function Categories() {
  const categories = await getManyCategories();

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {categories.map((category) => {
        return (
          <li key={category.value}>
            <CategoryLink
              href={routes.search({
                categories: [category.value],
              })}
              imageSrc={category.image}
              title={category.title}
              color={category.color}
            />
          </li>
        );
      })}
    </ul>
  );
}

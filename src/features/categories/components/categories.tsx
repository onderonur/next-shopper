import { routes } from '@/core/routing/routing.utils';
import { getManyCategories } from '@/features/categories/categories.data';
import { CategoryLink } from '@/features/categories/components/category-link';

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

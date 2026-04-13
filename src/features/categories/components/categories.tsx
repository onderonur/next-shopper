import { routes } from '@/core/routing/utils';
import { SKELETON_IMAGE } from '@/core/shared/utils';
import { BetterSkeleton } from '@/core/ui/components/better-skeleton';
import { CategoryLink } from '@/features/categories/components/category-link';
import { getManyCategories } from '@/features/categories/data';
import type { Category } from '@/generated/prisma';

type CategoryListProps = {
  categories: Category[];
};

function CategoryList({ categories }: CategoryListProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {categories.map((category) => {
        return (
          <li key={category.id}>
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

export async function Categories() {
  const categories = await getManyCategories();

  return <CategoryList categories={categories} />;
}

const mockCategories: CategoryListProps['categories'] = [
  {
    id: '0',
    title: 'Placeholder',
    image: SKELETON_IMAGE,
    color: 'var(--muted)',
    createdAt: new Date(),
    updatedAt: new Date(),
    value: 'Placeholder',
  },
  {
    id: '1',
    title: 'Placeholder',
    image: SKELETON_IMAGE,
    color: 'var(--muted)',
    createdAt: new Date(),
    updatedAt: new Date(),
    value: 'Placeholder',
  },
  {
    id: '2',
    title: 'Placeholder',
    image: SKELETON_IMAGE,
    color: 'var(--muted)',
    createdAt: new Date(),
    updatedAt: new Date(),
    value: 'Placeholder',
  },
  {
    id: '3',
    title: 'Placeholder',
    image: SKELETON_IMAGE,
    color: 'var(--muted)',
    createdAt: new Date(),
    updatedAt: new Date(),
    value: 'Placeholder',
  },
];

export function CategoriesSkeleton() {
  return (
    <BetterSkeleton>
      <CategoryList categories={mockCategories} />
    </BetterSkeleton>
  );
}

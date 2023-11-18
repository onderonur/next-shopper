import { getManyCategories } from '@/categories/category-fetchers';
import List from '@/common/list';
import ListItem from '@/common/list-item';
import { routes } from '@/routing/routing-utils';
import CategoryLink from './category-link';

export default async function Categories() {
  const categories = await getManyCategories();

  return (
    <List className="grid gap-4 lg:grid-cols-2">
      {categories.map((category) => {
        return (
          <ListItem key={category.value}>
            <CategoryLink
              href={routes.search({
                query: { categories: [category.value] },
              })}
              imageSrc={category.image}
              title={category.title}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

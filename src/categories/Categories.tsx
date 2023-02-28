import { categoriesService } from '@/categories/categoriesService';
import List from '@/common/List';
import ListItem from '@/common/ListItem';
import { routes } from '@/routing/RoutingUtils';
import CategoryLink from './CategoryLink';

export default async function Categories() {
  const categories = await categoriesService.getManyCategories();

  return (
    <List className="grid lg:grid-cols-2 gap-4">
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

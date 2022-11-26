import { categoriesService } from '@src/categories/categoriesService';
import ListItem from '@src/common/ListItem';
import { routes } from '@src/routing/routes';
import CategoryLink from './CategoryLink';

export default async function Categories() {
  const categories = await categoriesService.getManyCategories();

  return (
    <>
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
    </>
  );
}

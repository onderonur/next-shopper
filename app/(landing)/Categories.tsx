import { categoriesService } from '@src/categories/categoriesService';
import ListItem from '@src/common/ListItem';
import ImageLink from '@src/common/ImageLink';
import { routes } from '@src/routing/routes';

export default async function Categories() {
  const categories = await categoriesService.getManyCategories();

  return (
    <>
      {categories?.map((category) => {
        return (
          <ListItem key={category.value}>
            <ImageLink
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

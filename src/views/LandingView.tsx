import AppFooter from '@src/app-layout/AppFooter';
import Container from '@src/common/Container';
import Hero from '@src/landing/Hero';
import { GetServerSideProps } from 'next';
import { createQueryClient } from '@src/query-client/QueryClientUtils';
import { dehydrate } from 'react-query/hydration';
import { categoriesQuery, useCategories } from '@src/categories/useCategories';
import ErrorMessage from '@src/error-handling/ErrorMessage';
import ImageLink from '@src/landing/ImageLink';
import ImageLinkSkeleton from '@src/landing/ImageLinkSkeleton';
import List from '@src/common/List';
import { Category } from '@src/categories/CategoriesTypes';
import AppLayoutRoot from '@src/app-layout/AppLayoutRoot';
import { routes } from '@src/routing/routes';
import BaseSeo from '@src/seo/BaseSeo';

function HomeView() {
  const { data: categories, isLoading, error } = useCategories();

  return (
    <>
      <BaseSeo
        images={
          categories?.length
            ? categories.map((category) => ({
                url: category.image,
                alt: category.name,
              }))
            : undefined
        }
      />
      <AppLayoutRoot>
        <header>
          <Hero />
        </header>
        <main className="p-4 flex-grow">
          <ErrorMessage error={error}>
            <Container maxWidth="xl">
              <List<Category>
                className="grid lg:grid-cols-2 gap-4"
                items={categories}
                isLoading={isLoading}
                getItemKey={(category) => category.name}
                renderItem={(category) => (
                  <ImageLink
                    key={category.name}
                    href={routes.search({ query: { category: category.name } })}
                    imageSrc={category.image}
                    title={category.name}
                  />
                )}
                skeletonCount={4}
                itemSkeleton={<ImageLinkSkeleton />}
              />
            </Container>
          </ErrorMessage>
        </main>
        <AppFooter />
      </AppLayoutRoot>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = createQueryClient();
  await queryClient.prefetchQuery(categoriesQuery());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomeView;

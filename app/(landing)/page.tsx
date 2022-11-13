import AppFooter from '@src/app-layout/AppFooter';
import AppLayoutRoot from '@src/app-layout/AppLayoutRoot';
import Center from '@src/common/Center';
import Hero from '@src/common/Hero';
import { Suspense } from 'react';
import Categories from '@src/categories/Categories';
import CategoriesShell from '@src/categories/CategoriesShell';
import CategoriesSkeleton from '@src/categories/CategoriesSkeleton';

export default function LandingPage() {
  return (
    <AppLayoutRoot>
      <header>
        <Hero />
      </header>
      <main className="p-4 flex-grow">
        <Center maxWidth="xl">
          <CategoriesShell>
            <Suspense fallback={<CategoriesSkeleton />}>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Categories />
            </Suspense>
          </CategoriesShell>
        </Center>
      </main>
      <AppFooter />
    </AppLayoutRoot>
  );
}

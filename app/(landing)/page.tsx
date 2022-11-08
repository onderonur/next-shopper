import AppFooter from '@src/app-layout/AppFooter';
import AppLayoutRoot from '@src/app-layout/AppLayoutRoot';
import Container from '@src/common/Container';
import Hero from 'app/(landing)/Hero';
import CategoriesShell from './CategoriesShell';
import { Suspense } from 'react';
import CategoriesSkeleton from './CategoriesSkeleton';
import Categories from './Categories';

export default function LandingPage() {
  return (
    <AppLayoutRoot>
      <header>
        <Hero />
      </header>
      <main className="p-4 flex-grow">
        <Container maxWidth="xl">
          <CategoriesShell>
            <Suspense fallback={<CategoriesSkeleton />}>
              <Categories />
            </Suspense>
          </CategoriesShell>
        </Container>
      </main>
      <AppFooter />
    </AppLayoutRoot>
  );
}

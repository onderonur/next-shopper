import { routes } from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import { Hero } from '@/core/ui/components/hero';
import {
  Categories,
  CategoriesSkeleton,
} from '@/features/categories/components/categories';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = getMetadata({
  title: 'Home',
  pathname: routes.home(),
});

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <div className="mx-auto max-w-7xl p-4">
        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories />
        </Suspense>
      </div>
    </main>
  );
}

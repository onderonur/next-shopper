import { routes } from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import { Hero } from '@/core/ui/components/hero';
import { Categories } from '@/features/categories/components/categories';
import type { Metadata } from 'next';

export const metadata: Metadata = getMetadata({
  title: 'Home',
  pathname: routes.home(),
});

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <div className="mx-auto max-w-7xl p-4">
        <Categories />
      </div>
    </main>
  );
}

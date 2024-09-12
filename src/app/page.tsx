import { routes } from '@/core/routing/routing.utils';
import { getMetadata } from '@/core/seo/seo.utils';
import { Container } from '@/core/ui/components/container';
import { Hero } from '@/core/ui/components/hero';
import { Categories } from '@/features/categories/components/categories';

export const metadata = getMetadata({
  title: 'Home',
  pathname: routes.home(),
});

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Container maxWidth="xl" className="p-4">
        <Categories />
      </Container>
    </main>
  );
}

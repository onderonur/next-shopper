import { Container } from '@/common/container';
import { Hero } from '@/common/hero';
import { Categories } from '@/categories/categories';
import { getMetadata } from '@/seo/seo-utils';
import { AppLayoutRoot, AppFooter } from '@/app-layout/app-layout';

export const metadata = getMetadata({ title: 'Home', pathname: '/' });

export default function LandingPage() {
  return (
    <AppLayoutRoot>
      <main>
        <Hero />
        <Container maxWidth="xl" className="p-4">
          <Categories />
        </Container>
      </main>
      <AppFooter />
    </AppLayoutRoot>
  );
}

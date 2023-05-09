import AppFooter from '@/app-layout/AppFooter';
import AppLayoutRoot from '@/app-layout/AppLayoutRoot';
import Center from '@/common/Center';
import Hero from '@/common/Hero';
import Categories from '@/categories/Categories';
import { getMetadata } from '@/seo/SeoUtils';

export const metadata = getMetadata({ title: 'Home' });

export default function LandingPage() {
  return (
    <AppLayoutRoot>
      <main>
        <Hero />
        <Center maxWidth="xl" className="p-4">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Categories />
        </Center>
      </main>
      <AppFooter />
    </AppLayoutRoot>
  );
}

import { Card, CardContent } from '@/core/ui/components/card';
import { Section, SectionTitle } from '@/core/ui/components/section';

export default function ProductPageLayout({
  title,
  relatedProducts,
  children,
}: LayoutProps<'/products/[productId]'>) {
  return (
    <div className="flex flex-col gap-4">
      <main>
        {title}
        <Card>
          <CardContent>{children}</CardContent>
        </Card>
      </main>
      <Section asChild>
        <aside>
          <SectionTitle asChild>
            <h2>Related Products</h2>
          </SectionTitle>
          {relatedProducts}
        </aside>
      </Section>
    </div>
  );
}

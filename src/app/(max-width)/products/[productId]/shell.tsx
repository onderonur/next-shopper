import { Card, CardContent } from '@/core/ui/components/card';
import { Section, SectionTitle } from '@/core/ui/components/section';

type ProductShellProps = {
  title: React.ReactNode;
  productInfo: React.ReactNode;
  relatedProducts: React.ReactNode;
};

export function ProductShell({
  title,
  productInfo,
  relatedProducts,
}: ProductShellProps) {
  return (
    <div className="flex flex-col gap-4">
      <main>
        {title}
        <Card>
          <CardContent>{productInfo}</CardContent>
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

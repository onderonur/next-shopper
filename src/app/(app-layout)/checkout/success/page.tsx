import { getCart } from '@/cart/cart-fetchers';
import { CheckoutSuccessMessage } from '@/checkout/checkout-success-message';
import { Container } from '@/common/container';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section, SectionTitle } from '@/common/section';
import { redirect } from 'next/navigation';

export default async function CheckoutSuccessPage() {
  const cart = await getCart();

  if (cart) redirect('/');

  return (
    <main>
      <PageTitle title="Success" />
      <Container maxWidth="sm" className="flex flex-col gap-4">
        <Section>
          <SectionTitle as="h2">Checkout Success</SectionTitle>
          <Paper>
            <CheckoutSuccessMessage />
          </Paper>
        </Section>
      </Container>
    </main>
  );
}

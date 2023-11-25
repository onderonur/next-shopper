import { Container } from '@/common/container';
import { PageTitle } from '@/common/page-title';
import { Section, SectionTitle } from '@/common/section';
import { Paper } from '@/common/paper';
import { getCart } from '@/cart/cart-fetchers';
import { redirect } from 'next/navigation';
import { CheckoutSuccessMessage } from '@/checkout/checkout-success-message';

export default async function CheckoutSuccessPage() {
  const cart = await getCart();

  if (cart) {
    redirect('/');
  }

  return (
    <>
      <PageTitle title="Success" />
      <Container maxWidth="sm" className="flex flex-col gap-4">
        <Section>
          <SectionTitle as="h2">Checkout Success</SectionTitle>
          <Paper>
            <CheckoutSuccessMessage />
          </Paper>
        </Section>
      </Container>
    </>
  );
}

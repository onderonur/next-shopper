import { getCart } from '@/cart/cart-fetchers';
import { CartItemList } from '@/cart/cart-item-list';
import { CartTotalPrice } from '@/cart/cart-total-price';
import { ClearCartButton } from '@/cart/clear-cart-button';
import { CheckoutForm } from '@/checkout/checkout-form';
import { Container } from '@/common/container';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section, SectionTitle } from '@/common/section';
import { getMetadata } from '@/seo/seo-utils';

export const metadata = getMetadata({
  title: 'Checkout',
  pathname: '/checkout',
});

export default async function CheckoutPage() {
  const cart = await getCart();

  return (
    <main>
      <PageTitle title="Checkout" />
      <Container maxWidth="sm" className="flex flex-col gap-4">
        <Section>
          <SectionTitle as="h2" actions={<ClearCartButton cart={cart} />}>
            Cart
          </SectionTitle>
          <Paper className="p-0 md:p-0">
            <CartItemList />
            <CartTotalPrice className="p-6" />
          </Paper>
        </Section>
        {cart ? (
          <Section>
            <SectionTitle as="h2">Credit/Debit Card Information</SectionTitle>
            <Paper>
              <CheckoutForm />
            </Paper>
          </Section>
        ) : null}
      </Container>
    </main>
  );
}

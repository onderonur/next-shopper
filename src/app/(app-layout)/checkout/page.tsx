import { CartItemList } from '@/cart/cart-item-list';
import { CartTotalPrice } from '@/cart/cart-total-price';
import { CheckoutForm } from '@/checkout/checkout-form';
import { Container } from '@/common/container';
import { PageTitle } from '@/common/page-title';
import { Section, SectionTitle } from '@/common/section';
import { Paper } from '@/common/paper';
import { ClearCartButton } from '@/cart/clear-cart-button';
import { getCart } from '@/cart/cart-fetchers';

export default async function CheckoutPage() {
  const cart = await getCart();

  return (
    <>
      <PageTitle title="Checkout" />
      <Container maxWidth="sm" className="flex flex-col gap-4">
        <Section>
          <SectionTitle as="h2" actions={<ClearCartButton cart={cart} />}>
            Cart
          </SectionTitle>
          <Paper className="!p-0">
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
    </>
  );
}

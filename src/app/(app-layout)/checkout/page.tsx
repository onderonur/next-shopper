import { routes } from '@/core/routing/routing.utils';
import { getMetadata } from '@/core/seo/seo.utils';
import { Card, CardContent, CardFooter } from '@/core/ui/components/card';
import { Container } from '@/core/ui/components/container';
import { PageTitle } from '@/core/ui/components/page-title';
import { Section, SectionTitle } from '@/core/ui/components/section';
import { TotalPrice } from '@/core/ui/components/total-price';
import { redirectToSignIn } from '@/features/auth/auth.actions';
import { getUser } from '@/features/auth/auth.data';
import { getCart } from '@/features/cart/cart.data';
import { CartItemList } from '@/features/cart/components/cart-item-list';
import { ClearCartButton } from '@/features/cart/components/clear-cart-button';
import { ShippingForm } from '@/features/shipping/components/shipping-form';
import { getManyContinents } from '@/features/shipping/shipping.data';

export const metadata = getMetadata({
  title: 'Checkout',
  pathname: routes.checkout(),
});

export default async function CheckoutPage() {
  const user = await getUser();

  if (!user) await redirectToSignIn();

  const [cart, continents] = await Promise.all([
    getCart(),
    getManyContinents(),
  ]);

  return (
    <main>
      <PageTitle title="Checkout" />
      <Container maxWidth="sm" className="flex flex-col gap-6">
        <Section>
          <SectionTitle as="h2" actions={<ClearCartButton cart={cart} />}>
            Cart
          </SectionTitle>
          <Card>
            <CardContent className="p-0 md:p-0">
              <CartItemList />
            </CardContent>
            <CardFooter className="border-none">
              <TotalPrice value={cart?.totalPrice ?? 0} />
            </CardFooter>
          </Card>
        </Section>
        {cart ? (
          <Section>
            <SectionTitle as="h2">Shipping Info</SectionTitle>
            <ShippingForm continents={continents} />
          </Section>
        ) : null}
      </Container>
    </main>
  );
}

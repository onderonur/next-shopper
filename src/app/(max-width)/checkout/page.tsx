import { routes } from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import { Card, CardContent, CardFooter } from '@/core/ui/components/card';
import { PageTitle } from '@/core/ui/components/page-title';
import { Section, SectionTitle } from '@/core/ui/components/section';
import { TotalPrice } from '@/core/ui/components/total-price';
import { redirectToSignIn } from '@/features/auth/actions';
import { getUser } from '@/features/auth/data';
import { CartItemList } from '@/features/cart/components/cart-item-list';
import { ClearCartButton } from '@/features/cart/components/clear-cart-button';
import { getCart } from '@/features/cart/data';
import { ShippingForm } from '@/features/shipping/components/shipping-form';
import { getManyContinents } from '@/features/shipping/data';

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
      <div className="mx-auto flex max-w-screen-sm flex-col gap-6">
        <Section>
          <SectionTitle asChild actions={<ClearCartButton cart={cart} />}>
            <h2>Cart</h2>
          </SectionTitle>
          <Card>
            <CardContent className="p-0 md:p-0">
              <CartItemList cart={cart} />
            </CardContent>
            <CardFooter className="border-none">
              <TotalPrice value={cart?.totalPrice ?? 0} />
            </CardFooter>
          </Card>
        </Section>
        {cart ? (
          <Section>
            <SectionTitle asChild>
              <h2>Shipping Info</h2>
            </SectionTitle>
            <ShippingForm continents={continents} />
          </Section>
        ) : null}
      </div>
    </main>
  );
}

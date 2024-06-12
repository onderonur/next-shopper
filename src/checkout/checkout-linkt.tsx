import { ButtonLink } from '@/common/button-link';
import { routes } from '@/routing/routing-utils';
import { getCart } from '../cart/cart-fetchers';

export async function CheckoutLink() {
  const cart = await getCart();

  if (!cart) return null;

  return (
    <ButtonLink href={routes.checkout()} variant="primary" className="w-full">
      Proceed to Checkout
    </ButtonLink>
  );
}

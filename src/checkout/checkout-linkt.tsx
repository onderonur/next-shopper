import { ButtonLink } from '@/common/button-link';
import { getCart } from '../cart/cart-fetchers';
import { routes } from '@/routing/routing-utils';

export async function CheckoutLink() {
  const cart = await getCart();

  if (!cart) {
    return null;
  }

  return (
    <ButtonLink href={routes.checkout()} variant="primary" className="w-full">
      Proceed to Checkout
    </ButtonLink>
  );
}

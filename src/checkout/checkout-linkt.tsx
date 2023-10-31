import Button from '@/common/button';
import { getCart } from '../cart/cart-fetchers';
import { routes } from '@/routing/routing-utils';

export default async function CheckoutLink() {
  const cart = await getCart();

  if (!cart) {
    return null;
  }

  return (
    <Button href={routes.checkout()} variant="primary" className="my-2">
      Proceed to Checkout
    </Button>
  );
}

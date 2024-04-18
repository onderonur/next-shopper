import { ButtonLink } from '@/common/button-link';
import { CheckOutlinedIcon } from '@/common/icons';
import { routes } from '@/routing/routing-utils';

export function CheckoutSuccessMessage() {
  return (
    <div className="grid place-items-center gap-4 text-success">
      <CheckOutlinedIcon size="5rem" />
      <div className="text-center text-2xl font-semibold">
        Your order has been received
      </div>
      <ButtonLink href={routes.search()}>Back to Store</ButtonLink>
    </div>
  );
}

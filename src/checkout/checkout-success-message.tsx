import Button from '@/common/button';
import { CheckOutlinedIcon } from '@/common/icons';
import { routes } from '@/routing/routing-utils';

export default function CheckoutSuccessMessage() {
  return (
    <div className="grid place-items-center text-success-main gap-4">
      <CheckOutlinedIcon className="text-8xl" />
      <div className="font-semibold text-2xl text-center">
        Your order has been received
      </div>
      <Button href={routes.search()}>Back to Store</Button>
    </div>
  );
}

import Button from '@src/common/Button';
import { CheckOutlinedIcon } from '@src/common/Icons';
import { routes } from '@src/routing/routes';

function CheckoutSuccessMessage() {
  return (
    <div className="flex flex-col justify-center items-center text-success-main gap-4">
      <CheckOutlinedIcon className="text-8xl" />
      <div className="font-semibold text-2xl text-center">
        Your order has been received
      </div>
      <Button aria-label="Back to Store" href={routes.search()}>
        Back to Store
      </Button>
    </div>
  );
}

export default CheckoutSuccessMessage;

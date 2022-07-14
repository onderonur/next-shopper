import AppLayout from '@src/app-layout/AppLayout';
import CartItemList from '@src/cart/CartItemList';
import { clearCart, selectCartItems } from '@src/cart/cartSlice';
import CartTotalPrice from '@src/cart/CartTotalPrice';
import ClearCartButton from '@src/cart/ClearCartButton';
import { checkoutAPI } from '@src/checkout/checkoutAPI';
import CheckoutForm from '@src/checkout/CheckoutForm';
import CheckoutSuccessMessage from '@src/checkout/CheckoutSuccessMessage';
import { CompleteCheckoutArgs } from '@src/checkout/CheckoutUtils';
import Container from '@src/common/Container';
import PageHeader from '@src/common/PageHeader';
import Panel from '@src/common/Panel';
import Section from '@src/common/Section';
import { ApiRequestError } from '@src/error-handling/ErrorHandlingTypes';
import BaseSeo from '@src/seo/BaseSeo';
import { useAppDispatch, useAppSelector } from '@src/store/store';
import { useEffect } from 'react';
import { useMutation } from 'react-query';

function CheckoutView() {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const completeCheckoutMutation = useMutation<
    void,
    ApiRequestError,
    CompleteCheckoutArgs
  >({
    mutationFn: checkoutAPI.completeCheckout,
  });

  useEffect(() => {
    if (completeCheckoutMutation.isSuccess) {
      dispatch(clearCart());
    }
  }, [completeCheckoutMutation.isSuccess, dispatch]);

  return (
    <>
      <BaseSeo title="Checkout" />
      <PageHeader title="Checkout" />
      <Container maxWidth="sm" className="flex flex-col justify-center gap-4">
        {completeCheckoutMutation.isSuccess ? (
          <Section title="Checkout Success" titleAs="h1" hideTitle>
            <Panel>
              <CheckoutSuccessMessage />
            </Panel>
          </Section>
        ) : (
          <Section title="Cart" titleAs="h2" hideTitle>
            <Panel title="Cart" actions={<ClearCartButton />}>
              <CartItemList />
              <CartTotalPrice />
            </Panel>
          </Section>
        )}
        {cartItems.length > 0 && (
          <Section title="Payment Method" titleAs="h2" hideTitle>
            <Panel title="Payment Method">
              <CheckoutForm
                error={completeCheckoutMutation.error}
                onSubmit={async (values) => {
                  await completeCheckoutMutation.mutateAsync(values);
                }}
              />
            </Panel>
          </Section>
        )}
      </Container>
    </>
  );
}

CheckoutView.Layout = AppLayout;

export default CheckoutView;

import { DoCheckoutArgs } from '@src/api/checkout/checkoutService';
import AppLayout from '@src/app-layout/AppLayout';
import { useCartContext } from '@src/cart/CartContext';
import CartItemList from '@src/cart/CartItemList';
import CartTotalPrice from '@src/cart/CartTotalPrice';
import ClearCartButton from '@src/cart/ClearCartButton';
import { checkoutAPI } from '@src/checkout/checkoutAPI';
import CheckoutForm from '@src/checkout/CheckoutForm';
import CheckoutSuccessMessage from '@src/checkout/CheckoutSuccessMessage';
import Container from '@src/common/Container';
import PageHeader from '@src/common/PageHeader';
import Panel from '@src/common/Panel';
import Section from '@src/common/Section';
import { ApiRequestError } from '@src/error-handling/ErrorHandlingTypes';
import BaseSeo from '@src/seo/BaseSeo';
import { useEffect } from 'react';
import { useMutation } from 'react-query';

function CheckoutView() {
  const { cartItems, clearCart } = useCartContext();

  const doCheckoutMutation = useMutation<void, ApiRequestError, DoCheckoutArgs>(
    {
      mutationFn: checkoutAPI.doCheckout,
    },
  );

  useEffect(() => {
    if (doCheckoutMutation.isSuccess) {
      clearCart();
    }
  }, [clearCart, doCheckoutMutation.isSuccess]);

  return (
    <>
      <BaseSeo title="Checkout" />
      <PageHeader title="Checkout" />
      <Container maxWidth="sm" className="flex flex-col justify-center gap-4">
        {doCheckoutMutation.isSuccess ? (
          <Section title="Checkout Success" titleAs="h1" hideTitle>
            <Panel>
              <CheckoutSuccessMessage />
            </Panel>
          </Section>
        ) : (
          <Section title="Cart" titleAs="h2" hideTitle>
            <Panel title="Cart" actions={<ClearCartButton />}>
              <CartItemList className="max-h-80 overflow-auto" />
              <CartTotalPrice />
            </Panel>
          </Section>
        )}
        {cartItems.length > 0 && (
          <Section title="Payment Method" titleAs="h2" hideTitle>
            <Panel title="Payment Method">
              <CheckoutForm
                error={doCheckoutMutation.error}
                onSubmit={async (values) => {
                  await doCheckoutMutation.mutateAsync(values);
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

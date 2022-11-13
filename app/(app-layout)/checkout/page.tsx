'use client';

import CartItemList from '@src/cart/CartItemList';
import { clearCart, selectCartItems } from '@src/cart/cartSlice';
import CartTotalPrice from '@src/cart/CartTotalPrice';
import ClearCartButton from '@src/cart/ClearCartButton';
import { checkoutAPI } from '@src/checkout/checkoutAPI';
import CheckoutForm from '@src/checkout/CheckoutForm';
import CheckoutSuccessMessage from '@src/checkout/CheckoutSuccessMessage';
import Center from '@src/common/Center';
import PageTitle from '@src/common/PageTitle';
import { useAppDispatch, useAppSelector } from '@src/store/store';
import { useEffect } from 'react';
import { useMutation } from '@src/http-client/useMutation';
import SectionTitle from '@src/common/SectionTitle';
import Paper from '@src/common/Paper';

function CheckoutPage() {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const checkoutMutation = useMutation(checkoutAPI.completeCheckout);

  useEffect(() => {
    if (checkoutMutation.isSuccess) {
      dispatch(clearCart());
    }
  }, [checkoutMutation.isSuccess, dispatch]);

  return (
    <>
      <PageTitle title="Checkout" />
      <Center maxWidth="sm" className="flex flex-col justify-center gap-4">
        {checkoutMutation.isSuccess ? (
          <section>
            <SectionTitle as="h2">Checkout Success</SectionTitle>
            <Paper>
              <CheckoutSuccessMessage />
            </Paper>
          </section>
        ) : (
          <section>
            <SectionTitle as="h2" actions={<ClearCartButton />}>
              Cart
            </SectionTitle>
            <Paper>
              <CartItemList />
              <CartTotalPrice />
            </Paper>
          </section>
        )}
        {!!cartItems.length && (
          <section>
            <SectionTitle as="h2">Credit/Debit Card Information</SectionTitle>
            <Paper>
              <CheckoutForm
                error={checkoutMutation.error}
                onSubmit={async (values) => {
                  await checkoutMutation.mutate(values);
                }}
              />
            </Paper>
          </section>
        )}
      </Center>
    </>
  );
}

export default CheckoutPage;

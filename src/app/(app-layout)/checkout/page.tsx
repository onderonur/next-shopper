'use client';

import CartItemList from '@src/cart/CartItemList';
import { clearCart, selectCartItems } from '@src/cart/cartSlice';
import CartTotalPrice from '@src/cart/CartTotalPrice';
import ClearCartButton from '@src/cart/ClearCartButton';
import CheckoutForm from '@src/checkout/CheckoutForm';
import CheckoutSuccessMessage from '@src/checkout/CheckoutSuccessMessage';
import Center from '@src/common/Center';
import PageTitle from '@src/common/PageTitle';
import { useAppDispatch, useAppSelector } from '@src/store/store';
import { useState } from 'react';
import SectionTitle from '@src/common/SectionTitle';
import Paper from '@src/common/Paper';
import { useCheckoutMutation } from '@src/checkout/useCheckoutMutation';

function CheckoutPage() {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const [isSuccess, setIsSuccess] = useState(false);

  const checkoutMutation = useCheckoutMutation();

  return (
    <>
      <PageTitle title="Checkout" />
      <Center maxWidth="sm" className="flex flex-col justify-center gap-4">
        {isSuccess ? (
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
                  await checkoutMutation.trigger(values);
                  dispatch(clearCart());
                  setIsSuccess(true);
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

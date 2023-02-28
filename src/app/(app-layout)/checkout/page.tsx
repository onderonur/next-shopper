'use client';

import CartItemList from '@/cart/CartItemList';
import { clearCart, selectCartItems } from '@/cart/cartSlice';
import CartTotalPrice from '@/cart/CartTotalPrice';
import ClearCartButton from '@/cart/ClearCartButton';
import CheckoutForm from '@/checkout/CheckoutForm';
import CheckoutSuccessMessage from '@/checkout/CheckoutSuccessMessage';
import Center from '@/common/Center';
import PageTitle from '@/common/PageTitle';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useState } from 'react';
import SectionTitle from '@/common/SectionTitle';
import Paper from '@/common/Paper';
import { useCheckoutMutation } from '@/checkout/CheckoutHooks';

function CheckoutPage() {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const [isSuccess, setIsSuccess] = useState(false);

  const checkoutMutation = useCheckoutMutation();

  return (
    <>
      <PageTitle title="Checkout" />
      <Center maxWidth="sm" className="flex flex-col gap-4">
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

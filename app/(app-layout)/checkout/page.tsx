'use client';

import CartItemList from '@src/cart/CartItemList';
import { clearCart, selectCartItems } from '@src/cart/cartSlice';
import CartTotalPrice from '@src/cart/CartTotalPrice';
import ClearCartButton from '@src/cart/ClearCartButton';
import { checkoutAPI } from '@src/checkout/checkoutAPI';
import CheckoutForm from '@src/checkout/CheckoutForm';
import CheckoutSuccessMessage from '@src/checkout/CheckoutSuccessMessage';
import Container from '@src/common/Container';
import PageHeader from '@src/common/PageHeader';
import Section from '@src/common/Section';
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
      <PageHeader title="Checkout" />
      <Container maxWidth="sm" className="flex flex-col justify-center gap-4">
        {checkoutMutation.isSuccess ? (
          <Section>
            <SectionTitle as="h2">Checkout Success</SectionTitle>
            <Paper>
              <CheckoutSuccessMessage />
            </Paper>
          </Section>
        ) : (
          <Section>
            <SectionTitle as="h2" actions={<ClearCartButton />}>
              Cart
            </SectionTitle>
            <Paper>
              <CartItemList />
              <CartTotalPrice />
            </Paper>
          </Section>
        )}
        {!!cartItems.length && (
          <Section>
            <SectionTitle as="h2">Credit/Debit Card Information</SectionTitle>
            <Paper>
              <CheckoutForm
                error={checkoutMutation.error}
                onSubmit={async (values) => {
                  await checkoutMutation.mutate(values);
                }}
              />
            </Paper>
          </Section>
        )}
      </Container>
    </>
  );
}

export default CheckoutPage;

'use server';

import type { ServerActionState } from '@/core/actions/actions.types';
import { prisma } from '@/core/db/db';
import { routes } from '@/core/routing/routing.utils';
import { redirectToSignIn } from '@/features/auth/auth.actions';
import { getUser } from '@/features/auth/auth.data';
import { getUserCart } from '@/features/cart/cart.data';
import { redirect } from 'next/navigation';
import {
  completeCheckoutInputSchema,
  type CompleteCheckoutInput,
} from './checkout.schemas';

export async function completeCheckout(
  currentState: ServerActionState<CompleteCheckoutInput, never> | null,
  formData: FormData,
): Promise<ServerActionState<CompleteCheckoutInput, never>> {
  const user = await getUser();
  if (!user?.id) return await redirectToSignIn();

  const userCart = await getUserCart();
  if (!userCart) return await redirectToSignIn();

  const input = {
    continentId: formData.get('continentId'),
    regionId: formData.get('regionId'),
    cityId: formData.get('cityId'),
  };

  const inputResult = completeCheckoutInputSchema.safeParse(input);

  if (!inputResult.success) {
    return { success: false, fieldErrors: inputResult.error.format() };
  }

  const { data } = inputResult;

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      cityId: data.cityId,
      productsOnOrders: {
        create: userCart.productsOnCarts.map((productOnCarts) => ({
          productId: productOnCarts.productId,
          count: productOnCarts.count,
        })),
      },
    },
  });

  await prisma.cart.delete({
    where: {
      id: userCart.id,
    },
  });

  redirect(routes.order({ params: { orderId: order.id } }));
}

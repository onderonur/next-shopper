'use client';

import { AnimatePresence } from '@/core/animations/components/animate-presence';
import type { Maybe } from '@/core/shared/types';
import { CartIcon } from '@/core/ui/components/icons';
import { ProductBasicInfo } from '@/features/products/components/product-basic-info';
import { motion } from 'motion/react';
import type { CartDetails } from '../types';
import { CartItemActionButtons } from './cart-item-actions-buttons';

type CartItemListProps = {
  className?: string;
  cart: Maybe<CartDetails>;
};

export function CartItemList({ className, cart }: CartItemListProps) {
  if (!cart?.totalCount) {
    return (
      <div className="grid place-items-center gap-2 p-8 text-muted-foreground">
        <CartIcon className="text-7xl" />
        <div className="text-center text-xl font-semibold">
          Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <ul className={className}>
      <AnimatePresence>
        {cart.cart.productsOnCarts.map((productsOnCart) => {
          const { product, count } = productsOnCart;

          return (
            <li key={product.id} className="border-b-2 p-4">
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <ProductBasicInfo
                  product={product}
                  count={count}
                  shouldShowCount={false}
                />
                <div className="mt-2">
                  <CartItemActionButtons cartItem={productsOnCart} />
                </div>
              </motion.div>
            </li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}

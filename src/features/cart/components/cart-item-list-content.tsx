'use client';

import { AnimatePresence } from '@/core/animations/components/animate-presence';
import type { CartWithProducts } from '@/features/cart/cart.types';
import { CartItemActionButtons } from '@/features/cart/components/cart-item-actions-buttons';
import { ProductBasicInfo } from '@/features/products/components/product-basic-info';
import { motion } from 'framer-motion';

export type CartItemListContentProps = {
  cartItems: CartWithProducts;
};

export function CartItemListContent({ cartItems }: CartItemListContentProps) {
  // `AnimatePresence` works the same way with multiple children.
  // Just ensure that each has a unique key and components will animate in
  // and out as they're added or removed from the tree.
  // https://www.framer.com/motion/animate-presence/##multiple-children
  return (
    <AnimatePresence>
      {cartItems.productsOnCarts.map((productsOnCart) => {
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
  );
}

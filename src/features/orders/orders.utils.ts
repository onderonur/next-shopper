import type { OrderWithProducts } from '@/features/orders/orders.types';

export function getOrderTotalPrice(order: OrderWithProducts) {
  let totalPrice = 0;

  for (const productOnOrder of order.productsOnOrders) {
    const { product, count } = productOnOrder;
    totalPrice += product.price * count;
  }

  return totalPrice;
}

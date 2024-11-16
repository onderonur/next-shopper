import type { OrderDetails } from '@/features/orders/types';
import { ProductBasicInfo } from '@/features/products/components/product-basic-info';

type OrderProductsProps = {
  productsOnOrder: OrderDetails['productsOnOrders'];
};

export default function OrderProducts({ productsOnOrder }: OrderProductsProps) {
  return (
    <ul className="flex flex-col gap-2">
      {productsOnOrder.map((productOnOrder) => {
        const { product } = productOnOrder;
        return (
          <li key={product.id}>
            <ProductBasicInfo product={product} count={productOnOrder.count} />
          </li>
        );
      })}
    </ul>
  );
}

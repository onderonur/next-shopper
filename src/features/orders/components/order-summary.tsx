import { NextLink } from '@/core/routing/components/next-link';
import { routes } from '@/core/routing/utils';
import { getDateString } from '@/core/shared/utils';
import { ButtonLink } from '@/core/ui/components/button-link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/core/ui/components/card';
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from '@/core/ui/components/description-list';
import { Price } from '@/core/ui/components/price';
import { Tooltip } from '@/core/ui/components/tooltip';
import type { OrderDetails } from '@/features/orders/types';
import Image from 'next/image';

type OrderSummaryProps = {
  order: OrderDetails;
};

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <DescriptionList className="flex gap-4 text-sm">
          <div>
            <DescriptionTerm>Date</DescriptionTerm>
            <DescriptionDetails>
              {getDateString(order.createdAt)}
            </DescriptionDetails>
          </div>
          <div>
            <DescriptionTerm>Total</DescriptionTerm>
            <DescriptionDetails>
              <Price value={order.totalPrice} />
            </DescriptionDetails>
          </div>
        </DescriptionList>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-wrap gap-2">
          {order.productsOnOrders.map((productOnOrder) => {
            const { product } = productOnOrder;

            return (
              <li key={product.id}>
                <Tooltip content={product.title}>
                  <NextLink
                    className="relative block aspect-square w-12"
                    href={routes.product({ productId: product.id })}
                  >
                    <Image
                      className="rounded bg-white object-contain p-1"
                      src={product.image}
                      alt={product.title}
                      fill
                    />
                  </NextLink>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end">
          <ButtonLink
            className="text-sm"
            href={routes.order({ orderId: order.id })}
          >
            Details
          </ButtonLink>
        </div>
      </CardFooter>
    </Card>
  );
}

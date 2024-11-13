import { routes } from '@/core/routing/routing.utils';
import { getMetadata } from '@/core/seo/seo.utils';
import type { Id } from '@/core/shared/shared.types';
import { getDateString } from '@/core/shared/shared.utils';
import { Card, CardContent, CardFooter } from '@/core/ui/components/card';
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from '@/core/ui/components/description-list';
import { PageTitle } from '@/core/ui/components/page-title';
import { Section, SectionTitle } from '@/core/ui/components/section';
import { TotalPrice } from '@/core/ui/components/total-price';
import OrderProducts from '@/features/orders/components/order-products';
import { OrderSuccessMessage } from '@/features/orders/components/order-success-message';
import { getOneOrderById } from '@/features/orders/orders.data';
import { ShippingInfo } from '@/features/shipping/components/shipping-info';
import { notFound } from 'next/navigation';

type OrderPageProps = {
  params: {
    orderId: Id;
  };
};

export async function generateMetadata({
  params: { orderId },
}: OrderPageProps) {
  const order = await getOneOrderById(orderId);
  if (!order) notFound();

  return getMetadata({
    title: 'Order',
    description: 'View the details of your order',
    pathname: routes.order({ orderId }),
  });
}

export default async function OrderPage({
  params: { orderId },
}: OrderPageProps) {
  const order = await getOneOrderById(orderId);
  if (!order) notFound();

  return (
    <main>
      <PageTitle title="Order" />
      <div className="grid gap-4">
        <Card>
          <CardContent className="flex flex-col gap-3">
            <DescriptionList>
              <div className="flex gap-1">
                <DescriptionTerm>Date</DescriptionTerm>
                <DescriptionDetails>
                  {getDateString(order.createdAt)}
                </DescriptionDetails>
              </div>
            </DescriptionList>
            <OrderSuccessMessage />
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Section>
            <SectionTitle asChild>
              <h2>Shipping Info</h2>
            </SectionTitle>
            <Card>
              <CardContent>
                <ShippingInfo
                  cityName={order.city.name}
                  regionName={order.city.region.name}
                  continentName={order.city.region.continent.name}
                />
              </CardContent>
            </Card>
          </Section>
          <Section>
            <SectionTitle>
              <h2>Products</h2>
            </SectionTitle>
            <Card>
              <CardContent>
                {/* TODO: These "xOnY" namings may be improved */}
                <OrderProducts productsOnOrder={order.productsOnOrders} />
              </CardContent>
              <CardFooter>
                <TotalPrice value={order.totalPrice} />
              </CardFooter>
            </Card>
          </Section>
        </div>
      </div>
    </main>
  );
}

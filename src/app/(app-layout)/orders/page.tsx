import { getMetadata } from '@/core/seo/seo.utils';
import { Container } from '@/core/ui/components/container';
import { PageTitle } from '@/core/ui/components/page-title';
import { redirectToSignIn } from '@/features/auth/auth.actions';
import { getUser } from '@/features/auth/auth.data';
import { OrderSummary } from '@/features/orders/components/order-summary';
import { getManyUserOrders } from '@/features/orders/orders.data';

export const metadata = getMetadata({
  title: 'Orders',
  description: 'View your orders',
  pathname: '/orders',
});

export default async function OrdersPage() {
  const [user, orders] = await Promise.all([getUser(), getManyUserOrders()]);
  if (!user) return await redirectToSignIn();

  return (
    <main>
      <PageTitle title="Orders" />
      <Container maxWidth="sm">
        {orders.length ? (
          <ul className="flex flex-col gap-2">
            {orders.map((order) => {
              return (
                <li key={order.id}>
                  <OrderSummary order={order} />
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Nothing has been found...</p>
        )}
      </Container>
    </main>
  );
}

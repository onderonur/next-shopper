import { getMetadata } from '@/core/seo/utils';
import { PageTitle } from '@/core/ui/components/page-title';
import { redirectToSignIn } from '@/features/auth/actions';
import { getUser } from '@/features/auth/data';
import { OrderSummary } from '@/features/orders/components/order-summary';
import { getManyUserOrders } from '@/features/orders/data';

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
      <div className="mx-auto max-w-screen-sm">
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
      </div>
    </main>
  );
}

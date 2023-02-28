import { getMetadata } from '@/seo/SeoUtils';

type CheckoutLayoutProps = React.PropsWithChildren;

// Since checkout/page is a Client Component, Metadata API can not be used in it.
// So, we created this layout to be able to use it.
export const metadata = getMetadata({ title: 'Checkout' });

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return children;
}

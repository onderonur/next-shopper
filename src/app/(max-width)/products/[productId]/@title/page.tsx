import { PageTitle } from '@/core/ui/components/page-title';
import { getOneProductById } from '@/features/products/data';
import { notFound } from 'next/navigation';

export default async function ProductTitle(
  props: PageProps<'/products/[productId]'>,
) {
  const { productId } = await props.params;
  const product = await getOneProductById(productId);
  if (!product) notFound();
  return <PageTitle title={product.title} />;
}

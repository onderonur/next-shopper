import { createMockArray, SKELETON_IMAGE } from '@/core/shared/utils';
import { BetterSkeleton } from '@/core/ui/components/better-skeleton';
import { ProductCard } from '@/features/products/components/product-card';
import type { ProductListItem } from '@/features/products/types';
import { twMerge } from 'tailwind-merge';

type ProductCarouselProps = {
  className?: string;
  products: ProductListItem[];
};

export function ProductCarousel({ className, products }: ProductCarouselProps) {
  if (!products.length) return <p>Nothing has been found...</p>;

  return (
    <div className={twMerge('overflow-auto pb-2', className)}>
      <ul className="grid auto-cols-[40%] grid-flow-col gap-2 sm:auto-cols-[30%] md:auto-cols-[27%] md:gap-4 lg:auto-cols-[20%]">
        {products.map((product) => {
          return (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type ProductCarouselSkeletonProps = {
  itemCount: number;
};

export function ProductCarouselSkeleton({
  itemCount,
}: ProductCarouselSkeletonProps) {
  const mockProducts: ProductListItem[] = createMockArray(itemCount).map(
    (i) => ({
      id: String(i),
      title: 'Lorem ipsum dolor sit amet, consectetur.',
      price: 99.99,
      image: SKELETON_IMAGE,
      description: '',
      categoryId: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isInFavorites: false,
    }),
  );

  return (
    <BetterSkeleton>
      <ProductCarousel products={mockProducts} />
    </BetterSkeleton>
  );
}

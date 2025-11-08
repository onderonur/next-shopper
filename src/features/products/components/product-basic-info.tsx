import { NextLink } from '@/core/routing/components/next-link';
import { routes } from '@/core/routing/utils';
import { Price } from '@/core/ui/components/price';
import { Tooltip } from '@/core/ui/components/tooltip';
import type { Product } from '@/generated/prisma';
import Image from 'next/image';
import { twJoin } from 'tailwind-merge';

type ProductBasicInfoProps = {
  product: Product;
  count: number;
  shouldShowCount?: boolean;
};

export function ProductBasicInfo({
  product,
  count,
  shouldShowCount = true,
}: ProductBasicInfoProps) {
  return (
    <NextLink
      // When `flex` is used, `truncate` does not work for product title
      // even if `min-w-0` trick is used.
      // So, we use `grid` instead.
      className="grid grid-cols-[--spacing(16)_1fr] gap-2"
      href={routes.product({ productId: product.id })}
    >
      <div className="relative block aspect-square w-16">
        <Image
          className="rounded-sm bg-white object-contain p-1"
          src={product.image}
          alt={product.title}
          fill
        />
      </div>
      <div
        className={twJoin(
          'flex items-center justify-between gap-2',
          // To make `truncate` work.
          'min-w-0',
        )}
      >
        <div
          // To make `truncate` work.
          className="min-w-0"
        >
          <Tooltip content={product.title}>
            <div className="truncate font-semibold">{product.title}</div>
          </Tooltip>
          <Price
            className="text-primary font-semibold"
            value={product.price * count}
            isAnimated
          />
        </div>
        {shouldShowCount && !!count && (
          <div className="bg-accent text-accent-foreground rounded-sm px-2 py-1 text-sm font-bold">
            {count}
          </div>
        )}
      </div>
    </NextLink>
  );
}

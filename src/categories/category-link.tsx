import type { NextLinkProps } from '@/routing/next-link';
import { NextLink } from '@/routing/next-link';
import Image from 'next/image';

type CategoryLinkProps = Pick<NextLinkProps, 'href'> & {
  imageSrc: string;
  title: string;
};

export function CategoryLink({ href, imageSrc, title }: CategoryLinkProps) {
  return (
    <NextLink
      className="group relative block h-80 w-full overflow-hidden rounded-md"
      href={href}
    >
      <Image
        src={imageSrc}
        alt={title}
        className="transform object-cover transition duration-700 group-hover:scale-110"
        fill
        priority
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="rounded-md bg-black bg-opacity-50 p-6">
          <h2 className="mb-2 border-b-4 text-center text-3xl font-bold text-text-contrast md:text-4xl">
            {title}
          </h2>
        </div>
      </div>
    </NextLink>
  );
}

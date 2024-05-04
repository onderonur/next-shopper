import type { NextLinkProps } from '@/routing/next-link';
import { NextLink } from '@/routing/next-link';

type CategoryLinkProps = Pick<NextLinkProps, 'href'> & {
  imageSrc: string;
  title: string;
  color: string;
};

export function CategoryLink({
  href,
  imageSrc,
  title,
  color,
}: CategoryLinkProps) {
  return (
    <NextLink
      className="group relative block h-80 overflow-hidden rounded-md"
      href={href}
    >
      <div
        className="absolute inset-0 grid place-items-center bg-cover bg-center bg-blend-luminosity transition duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${imageSrc})`, backgroundColor: color }}
      />
      <h2 className="absolute bottom-2 right-2 text-3xl font-bold text-white [text-shadow:0_0_0.5rem_#000]">
        {title}
      </h2>
    </NextLink>
  );
}

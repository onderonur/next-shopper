import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { Omit } from './common-types';

type BaseImageProps = Omit<ImageProps, 'alt'> &
  Required<Pick<ImageProps, 'alt'>>;

export default function BaseImage({ alt, ...rest }: BaseImageProps) {
  return (
    <Image
      {...rest}
      alt={alt}
      // We set image as `unoptimized` to not exceed the
      // fair usage policy of vercel about image optimization.
      // https://vercel.com/docs/platform/fair-use-policy
      unoptimized
    />
  );
}

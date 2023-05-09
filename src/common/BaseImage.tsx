import Image, { ImageProps } from 'next/image';
import { Omit } from './CommonTypes';

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

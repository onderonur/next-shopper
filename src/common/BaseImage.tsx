import Image, { ImageProps } from 'next/image';

type BaseImageProps = ImageProps;

function BaseImage({
  // We set image as `unoptimized` to not exceed the
  // fair usage policy of vercel about image optimization.
  // https://vercel.com/docs/platform/fair-use-policy
  unoptimized = true,
  alt,
  ...rest
}: BaseImageProps) {
  return <Image {...rest} alt={alt} unoptimized={unoptimized} />;
}

export default BaseImage;

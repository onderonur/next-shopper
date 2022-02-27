import NextLink, { NextLinkProps } from '@src/routing/NextLink';
import BaseImage from '@src/common/BaseImage';

type ImageLinkProps = Pick<NextLinkProps, 'href'> & {
  imageSrc: string;
  title: string;
};

function ImageLink({ href, imageSrc, title }: ImageLinkProps) {
  return (
    <NextLink
      className="relative block w-full h-80 group rounded-md overflow-hidden"
      href={href}
    >
      <BaseImage
        src={imageSrc}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="transition duration-700 transform group-hover:scale-110"
        priority
      />
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="p-6 bg-black bg-opacity-50 rounded-md">
          <h2 className="text-white text-4xl font-bold border-b-4 mb-2 text-center">
            {title}
          </h2>
        </div>
      </div>
    </NextLink>
  );
}

export default ImageLink;

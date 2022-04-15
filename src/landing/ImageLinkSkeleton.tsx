import ContentLoader from 'react-content-loader';

function ImageLinkSkeleton() {
  return (
    <ContentLoader
      uniqueKey="imageLinkSkeleton"
      className="rounded-md w-full h-80"
    >
      <rect width="100%" height="100%" />
    </ContentLoader>
  );
}

export default ImageLinkSkeleton;

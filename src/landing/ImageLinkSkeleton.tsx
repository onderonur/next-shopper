import ContentLoader from 'react-content-loader';

function ImageLinkSkeleton() {
  return (
    <ContentLoader
      // TODO: testid yerine accessibility ile ilgili daha iyi bişey bulunabilir belki
      data-testid="image-link-skeleton"
      uniqueKey="imageLinkSkeleton"
      className="rounded-md w-full h-80"
    >
      <rect width="100%" height="100%" />
    </ContentLoader>
  );
}

export default ImageLinkSkeleton;

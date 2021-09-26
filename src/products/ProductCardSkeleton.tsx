import ContentLoader from 'react-content-loader';

function ProductCardSkeleton() {
  return (
    <ContentLoader uniqueKey="productCardSkeleton" viewBox="0 0 242 500">
      <rect x="12%" y="12" width="76%" height="270" />
      <rect x="30%" y="296" width="40%" height="20" />
      <rect x="0" y="320" width="100%" height="18" />
      <rect x="10%" y="342" width="80%" height="18" />
      <rect x="25%" y="366" width="50%" height="24" />
      <rect x="0" y="450" width="100%" height="50" />
    </ContentLoader>
  );
}

export default ProductCardSkeleton;

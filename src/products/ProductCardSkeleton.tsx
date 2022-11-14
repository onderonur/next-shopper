import ContentLoader from 'react-content-loader';

export default function ProductCardSkeleton() {
  return (
    <ContentLoader uniqueKey="productCardSkeleton" viewBox="0 0 242 270">
      <rect x="12%" y="12" width="76%" height="180" />
      <rect x="30%" y="206" width="40%" height="18" />
      <rect x="0" y="230" width="100%" height="16" />
      <rect x="10%" y="250" width="80%" height="16" />
    </ContentLoader>
  );
}

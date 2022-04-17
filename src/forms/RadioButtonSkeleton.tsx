import ContentLoader from 'react-content-loader';

function RadioButtonSkeleton() {
  return (
    <ContentLoader uniqueKey="radioButtonSkeletton" viewBox="0 0 200 48">
      <circle cx="18" cy="18" r="18" />
      <rect rx="4" x="22%" y="5" width="78%" height="28" />
    </ContentLoader>
  );
}

export default RadioButtonSkeleton;

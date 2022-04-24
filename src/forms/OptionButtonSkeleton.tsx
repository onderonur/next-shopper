import ContentLoader from 'react-content-loader';

function OptionButtonSkeleton() {
  return (
    <ContentLoader uniqueKey="optionButtonSkeletton" viewBox="0 0 200 48">
      <rect rx="4" y="10" width="28" height="28" />
      <rect rx="4" x="18%" y="10" width="78%" height="28" />
    </ContentLoader>
  );
}

export default OptionButtonSkeleton;

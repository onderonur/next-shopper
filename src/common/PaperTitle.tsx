import ContentLoader from 'react-content-loader';

type PaperTitleProps = React.PropsWithChildren<{
  isLoading?: boolean;
}>;

// TODO: Belki bu loading vs olayı skeleton + shell'e döndürülebilir de.
export default function PaperTitle({ children, isLoading }: PaperTitleProps) {
  return (
    <div className="mb-1 font-semibold text-lg text-text-light">
      {isLoading ? (
        <ContentLoader uniqueKey="optionButtonSkeletton" viewBox="0 0 260 28">
          <rect rx="4" width="65%" height="28" />
        </ContentLoader>
      ) : (
        children
      )}
    </div>
  );
}

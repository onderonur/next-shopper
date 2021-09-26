import Loading from './Loading';

type PanelProps = React.PropsWithChildren<{
  title?: string;
  className?: string;
  isLoading?: boolean;
  actions?: React.ReactNode;
}>;

function Panel({ title, className, isLoading, children, actions }: PanelProps) {
  return (
    <div className={className}>
      {(title || actions) && (
        <div className="flex items-center">
          <div className="font-semibold text-lg text-text-light">{title}</div>
          <div className="flex-grow" />
          {actions}
        </div>
      )}
      <div className="shadow-md rounded-lg p-6 bg-background-main">
        <Loading isLoading={isLoading}>{children}</Loading>
      </div>
    </div>
  );
}

export default Panel;

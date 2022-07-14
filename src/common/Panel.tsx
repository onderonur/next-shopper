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
        <div className="flex items-end mb-1">
          {title && (
            <div
              data-testid="panel-title"
              className="font-semibold text-lg text-text-light"
            >
              {title}
            </div>
          )}
          <div className="flex-grow" />
          {actions && <div data-testid="panel-actions">{actions}</div>}
        </div>
      )}
      <div
        data-testid="panel-content"
        className="shadow-md rounded-lg p-6 bg-background-main"
      >
        <Loading isLoading={isLoading}>{children}</Loading>
      </div>
    </div>
  );
}

export default Panel;

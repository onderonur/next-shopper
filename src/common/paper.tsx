import classNames from 'classnames';

type PaperProps = React.PropsWithChildren<{ className?: string }>;

export default function Paper({ className, children }: PaperProps) {
  return (
    <div
      className={classNames(
        'bg-background-main p-4 shadow-md md:rounded-lg md:p-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

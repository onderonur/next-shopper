import GoBackButton from '@src/routing/GoBackButton';
import classNames from 'classnames';

type PageHeaderProps = {
  isHidden?: boolean;
  title: string;
};

export default function PageHeader({ isHidden, title }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-2">
      {!isHidden && (
        <div className="flex-shrink-0">
          <GoBackButton />
        </div>
      )}
      <h1
        className={classNames(
          isHidden
            ? 'sr-only'
            : 'border-l pl-4 font-bold text-text-light line-clamp-2',
        )}
      >
        {title}
      </h1>
    </div>
  );
}

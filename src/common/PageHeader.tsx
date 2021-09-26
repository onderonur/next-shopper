import GoBackButton from '@src/routing/GoBackButton';
import { Maybe } from './CommonTypes';

interface PageHeaderProps {
  title: Maybe<string>;
}

function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="flex-shrink-0">
        <GoBackButton />
      </div>
      <h1 className="border-l pl-4 font-bold text-text-light line-clamp-2">
        {title}
      </h1>
    </div>
  );
}

export default PageHeader;

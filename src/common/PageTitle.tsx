import GoBackButton from '@src/routing/GoBackButton';
import MobilePadding from './MobilePadding';

type PageTitleProps = {
  srOnly?: boolean;
  title: string;
};

export default function PageTitle({ srOnly, title }: PageTitleProps) {
  if (srOnly) {
    return <h1 className="sr-only">{title}</h1>;
  }

  return (
    <MobilePadding className="flex items-center gap-2 mb-2">
      <div className="flex-shrink-0">
        <GoBackButton />
      </div>
      <h1 className="border-l pl-4 font-bold text-text-light line-clamp-2">
        {title}
      </h1>
    </MobilePadding>
  );
}

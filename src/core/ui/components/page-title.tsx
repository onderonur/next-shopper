import { GoBackButton } from '@/core/ui/components/go-back-button';

type PageTitleProps = {
  srOnly?: boolean;
  title: string;
};

export function PageTitle({ srOnly, title }: PageTitleProps) {
  if (srOnly) {
    return <h1 className="sr-only">{title}</h1>;
  }

  return (
    <div className="mb-2 flex items-center gap-2">
      <div className="flex-none">
        <GoBackButton />
      </div>
      <h1 className="text-muted-foreground line-clamp-2 border-l pl-4 font-bold">
        {title}
      </h1>
    </div>
  );
}

import { GoBackButton } from '@/core/ui/components/go-back-button';
import { Skeleton } from './skeleton';

type PageTitleShellProps = {
  title: React.ReactNode;
};

function PageTitleShell({ title }: PageTitleShellProps) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <div className="flex-none">
        <GoBackButton />
      </div>
      {title}
    </div>
  );
}

type PageTitleProps = {
  srOnly?: boolean;
  title: string;
};

export function PageTitle({ srOnly, title }: PageTitleProps) {
  if (srOnly) {
    return <h1 className="sr-only">{title}</h1>;
  }

  return (
    <PageTitleShell
      title={
        <h1 className="text-muted-foreground line-clamp-2 border-l pl-4 font-bold">
          {title}
        </h1>
      }
    />
  );
}

export function PageTitleSkeleton() {
  return (
    <PageTitleShell
      title={<Skeleton className="ml-4 h-6 w-full max-w-lg border-l" />}
    />
  );
}

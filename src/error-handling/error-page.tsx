import {
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  Layout,
} from '@/layout/layout';

type ErrorPageProps = React.PropsWithChildren<{
  statusCode: number;
  message: string;
}>;

export function ErrorPage({ statusCode, message, children }: ErrorPageProps) {
  return (
    <Layout>
      <LayoutHeader />
      <LayoutContent>
        <main className="mb-12 grid h-full place-content-center gap-4">
          <h1 className="flex items-center">
            <span className="border-r-2 p-4 text-3xl font-bold text-text-lighter">
              {statusCode}
            </span>
            <span className="p-4 text-lg font-semibold text-text-light">
              {message}
            </span>
          </h1>
          {children}
        </main>
      </LayoutContent>
      <LayoutFooter />
    </Layout>
  );
}

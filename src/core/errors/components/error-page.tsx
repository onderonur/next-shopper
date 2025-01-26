type ErrorPageProps = {
  statusCode: number;
  message: string;
  children: React.ReactNode;
};

export function ErrorPage({ statusCode, message, children }: ErrorPageProps) {
  return (
    <main className="mb-12 grid h-full place-content-center gap-4">
      <h1 className="flex min-w-0 flex-col items-center text-center md:flex-row md:text-left">
        <span className="text-foreground border-b-2 p-4 text-3xl font-bold md:border-r-2 md:border-b-0">
          {statusCode}
        </span>
        <span className="text-muted-foreground w-full max-w-screen-sm p-4 text-lg font-semibold break-words">
          {message}
        </span>
      </h1>
      {children}
    </main>
  );
}

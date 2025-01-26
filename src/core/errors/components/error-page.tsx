type ErrorPageProps = {
  statusCode: number;
  message: string;
  children: React.ReactNode;
};

export function ErrorPage({ statusCode, message, children }: ErrorPageProps) {
  return (
    <main className="mb-12 grid h-full place-content-center gap-4">
      <h1 className="flex items-center">
        <span className="text-foreground border-r-2 p-4 text-3xl font-bold">
          {statusCode}
        </span>
        <span className="text-muted-foreground max-w-screen-sm p-4 text-lg font-semibold break-words">
          {message}
        </span>
      </h1>
      {children}
    </main>
  );
}

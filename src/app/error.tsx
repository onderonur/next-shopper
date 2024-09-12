// Error boundaries must be Client Components:
// https://nextjs.org/docs/app/building-your-application/routing/error-handling
'use client';

import { ErrorPage } from '@/core/errors/components/error-page';
import { Button } from '@/core/ui/components/button';
import { StatusCodes } from 'http-status-codes';

type RootErrorPageProps = {
  error: Error;
  reset: VoidFunction;
};

export default function RootErrorPage({ error, reset }: RootErrorPageProps) {
  return (
    <ErrorPage
      statusCode={StatusCodes.INTERNAL_SERVER_ERROR}
      message={error.message}
    >
      <Button
        className="mx-auto w-fit"
        onClick={() => {
          reset();
        }}
      >
        Try Again
      </Button>
    </ErrorPage>
  );
}

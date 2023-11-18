// Error boundaries must be Client Components:
// https://nextjs.org/docs/app/building-your-application/routing/error-handling#error-boundaries
'use client';

import { Button } from '@/common/button';
import { ErrorPage } from '@/error-handling/error-page';
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

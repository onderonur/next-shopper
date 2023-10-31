// Error boundaries must be Client Components:
// https://nextjs.org/docs/app/building-your-application/routing/error-handling#error-boundaries
'use client';

import ErrorPage from '@/error-handling/error-page';
import { StatusCodes } from 'http-status-codes';

export default function RootErrorPage({ error }: { error: Error }) {
  return (
    <ErrorPage
      statusCode={StatusCodes.INTERNAL_SERVER_ERROR}
      message={error.message}
    />
  );
}

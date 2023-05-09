// Error boundaries must be Client Components:
// https://beta.nextjs.org/docs/routing/error-handling#error-boundaries
'use client';

import ErrorLayout from '@/error-handling/ErrorLayout';
import ErrorContent from '@/error-handling/ErrorContent';
import { StatusCodes } from 'http-status-codes';

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <ErrorLayout>
      <ErrorContent
        statusCode={StatusCodes.INTERNAL_SERVER_ERROR}
        message={error.message}
      />
    </ErrorLayout>
  );
}

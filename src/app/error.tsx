// Error boundaries must be Client Components:
// https://beta.nextjs.org/docs/routing/error-handling#error-boundaries
'use client';

import CenteredLayout from '@src/app-layout/CenteredLayout';
import ErrorContent from '@src/error-handling/ErrorContent';
import { StatusCodes } from 'http-status-codes';

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <CenteredLayout>
      <ErrorContent
        statusCode={StatusCodes.INTERNAL_SERVER_ERROR}
        message={error.message}
      />
    </CenteredLayout>
  );
}

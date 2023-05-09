import ErrorLayout from '@/error-handling/ErrorLayout';
import ErrorContent from '@/error-handling/ErrorContent';
import { StatusCodes } from 'http-status-codes';

// TODO: Add metadata. It's not working for now.
// export const metadata = getMetadata({ title: 'Not Found' });

export default function NotFoundPage() {
  return (
    <ErrorLayout>
      <ErrorContent
        statusCode={StatusCodes.NOT_FOUND}
        message="This page could not be found"
      />
    </ErrorLayout>
  );
}

import ErrorContent from '@src/error-handling/ErrorContent';
import { StatusCodes } from 'http-status-codes';

// TODO: Error layout ekle
export default function NotFoundPage() {
  return (
    <ErrorContent
      statusCode={StatusCodes.NOT_FOUND}
      message="This page could not be found"
    />
  );
}

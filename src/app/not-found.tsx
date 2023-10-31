import { StatusCodes } from 'http-status-codes';
import ErrorPage from '@/error-handling/error-page';
import { getMetadata } from '@/seo/seo-utils';

export const metadata = getMetadata({
  title: 'Not Found',
  description: 'The resource you are looking for not found.',
});

export default function NotFoundPage() {
  return (
    <ErrorPage
      statusCode={StatusCodes.NOT_FOUND}
      message="This page could not be found"
    />
  );
}

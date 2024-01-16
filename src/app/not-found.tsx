import { ButtonLink } from '@/common/button-link';
import { ErrorPage } from '@/error-handling/error-page';
import { getMetadata } from '@/seo/seo-utils';
import { StatusCodes } from 'http-status-codes';

export const metadata = getMetadata({
  title: 'Not Found',
  description: 'The resource you are looking for is not found.',
});

export default function NotFoundPage() {
  return (
    <ErrorPage
      statusCode={StatusCodes.NOT_FOUND}
      message="This page could not be found"
    >
      <ButtonLink href="/" className="mx-auto w-fit">
        Back to Home
      </ButtonLink>
    </ErrorPage>
  );
}

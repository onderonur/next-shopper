import { ErrorPage } from '@/core/errors/components/error-page';
import { getMetadata } from '@/core/seo/utils';
import { ButtonLink } from '@/core/ui/components/button-link';
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

import ErrorContent, {
  ErrorContentProps,
} from '@src/error-handling/ErrorContent';
import { StatusCodes } from 'http-status-codes';
import { NextPage } from 'next';

type ErrorPageProps = ErrorContentProps;

const ErrorPage: NextPage<ErrorPageProps> = (props) => {
  return <ErrorContent {...props} />;
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode =
    res?.statusCode ?? err?.statusCode ?? StatusCodes.NOT_FOUND;
  const message = err?.message ?? res?.statusMessage ?? 'Something went wrong';
  return { statusCode, message };
};

export default ErrorPage;

import AppLayout from '@src/app-layout/AppLayout';
import ErrorContent, {
  ErrorContentProps,
} from '@src/error-handling/ErrorContent';
import { StatusCodes } from 'http-status-codes';
import { NextPage } from 'next';

type ErrorViewProps = ErrorContentProps;

const ErrorView: NextPage<ErrorViewProps> = (props) => {
  return <ErrorContent {...props} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(ErrorView as any).Layout = AppLayout;

ErrorView.getInitialProps = ({ res, err }) => {
  const statusCode =
    res?.statusCode ?? err?.statusCode ?? StatusCodes.NOT_FOUND;
  const message = err?.message ?? res?.statusMessage ?? 'Something went wrong';
  return { statusCode, message };
};

export default ErrorView;

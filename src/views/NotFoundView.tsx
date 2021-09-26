import AppLayout from '@src/app-layout/AppLayout';
import ErrorContent from '@src/error-handling/ErrorContent';
import { StatusCodes } from 'http-status-codes';

function NotFoundView() {
  return (
    <ErrorContent
      statusCode={StatusCodes.NOT_FOUND}
      message="This page could not be found"
    />
  );
}

NotFoundView.Layout = AppLayout;

export default NotFoundView;

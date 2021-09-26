import axios from 'axios';
import { Maybe } from '@src/common/CommonTypes';
import { ApiRequestError } from './ErrorHandlingTypes';

type ErrorMessageProps = React.PropsWithChildren<{
  error: Maybe<Error | ApiRequestError>;
}>;

function ErrorMessage({ children, error }: ErrorMessageProps) {
  if (!error) {
    return <>{children}</>;
  }

  let { message } = error ?? {};
  if (axios.isAxiosError(error)) {
    message = error.response?.data.message;
  }

  if (!message) {
    message = 'Something went wrong';
  }

  return (
    <div className="bg-error-lighter text-error-dark border border-error-main rounded-md p-4">
      {message}
    </div>
  );
}

export default ErrorMessage;

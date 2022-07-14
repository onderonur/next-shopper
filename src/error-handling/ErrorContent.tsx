import Button from '@src/common/Button';
import { StatusCodes } from 'http-status-codes';

export interface ErrorContentProps {
  statusCode: StatusCodes;
  message: string;
}

const ErrorContent = ({ statusCode, message }: ErrorContentProps) => {
  return (
    <div className="absolute inset-0 flex flex-col gap-4 justify-center items-center">
      <div className="flex items-center">
        <span
          data-testid="error-content-status-code"
          className="border-r-2 p-4 text-3xl font-bold text-text-lighter"
        >
          {statusCode}
        </span>
        <span
          data-testid="error-content-message"
          className="p-4 font-semibold text-lg text-text-light"
        >
          {message}
        </span>
      </div>
      <Button href="/">Back to Home</Button>
    </div>
  );
};

export default ErrorContent;

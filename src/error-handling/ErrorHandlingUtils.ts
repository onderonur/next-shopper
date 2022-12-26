import { goTry } from 'go-try';
import { isHttpError } from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'next';
import { ApiErrorResponse } from './ErrorHandlingTypes';

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong';

export const handleErrors =
  (fn: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    const [error, data] = await goTry(async () => {
      const response = await fn(req, res);
      return response;
    });

    if (!error) {
      return data;
    }

    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = DEFAULT_ERROR_MESSAGE;
    if (isHttpError(error)) {
      statusCode = error.statusCode ?? statusCode;
      message = error.message ?? message;
    }

    const errorResponse: ApiErrorResponse = { statusCode, message };
    return res.status(errorResponse.statusCode).json(errorResponse);
  };

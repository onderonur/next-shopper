import { NextApiHandler } from 'next';
import createHttpError, { isHttpError } from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import {
  ApiErrorResponse,
  BaseMethodHandlerSchema,
  MethodHandlers,
  MethodName,
} from './ApiTypes';
import { goTry } from 'go-try';

const handleErrors =
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
    let message = 'Something went wrong';
    if (isHttpError(error)) {
      statusCode = error.statusCode ?? statusCode;
      message = error.message ?? message;
    }

    const errorResponse: ApiErrorResponse = { statusCode, message };
    return res.status(errorResponse.statusCode).json(errorResponse);
  };

export const createHandler =
  <MethodHandlerSchema extends BaseMethodHandlerSchema>(
    handlers: MethodHandlers<MethodHandlerSchema>,
  ): NextApiHandler =>
  (req, res) => {
    if (req.method) {
      const handler = handlers[req.method as MethodName];
      if (handler) {
        return handleErrors(handler)(req, res);
      }
    }
    throw new createHttpError.MethodNotAllowed();
  };

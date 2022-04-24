import { NextApiHandler } from 'next';
import createHttpError, { isHttpError } from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import {
  ApiErrorResponse,
  BaseMethodHandlerSchema,
  MethodHandlers,
  MethodName,
} from './ApiTypes';
import { services } from './ApiServices';
import { goTry } from 'go-try';

const handleErrors =
  (fn: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    const [error, data] = await goTry(async () => {
      const response = await fn(req, res);
      return response;
    });

    if (error) {
      let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      let message = 'Something went wrong';
      if (isHttpError(error)) {
        statusCode = error.statusCode ?? statusCode;
        message = error.message ?? message;
      }

      const errorResponse: ApiErrorResponse = { statusCode, message };
      return res.status(errorResponse.statusCode).json(errorResponse);
    }

    return data;
  };

export const createHandler =
  <MethodHandlerSchema extends BaseMethodHandlerSchema>(
    handlers: MethodHandlers<MethodHandlerSchema>,
  ): NextApiHandler =>
  (req, res) => {
    if (req.method) {
      const handler = handlers[req.method as MethodName];
      if (handler) {
        // Injecting services
        req.services = services;
        return handleErrors(handler)(req, res);
      }
    }
    throw new createHttpError.MethodNotAllowed();
  };

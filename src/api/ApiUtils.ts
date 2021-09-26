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

const handleErrors =
  (fn: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    try {
      return await fn(req, res);
    } catch (err) {
      let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      let message = 'Something went wrong';
      if (isHttpError(err)) {
        statusCode = err.statusCode ?? statusCode;
        message = err.message ?? message;
      }
      const errorResponse: ApiErrorResponse = { statusCode, message };
      return res.status(statusCode).json(errorResponse);
    }
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

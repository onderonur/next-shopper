import { NextApiHandler } from 'next';
import createHttpError from 'http-errors';
import {
  BaseMethodHandlerSchema,
  MethodHandlers,
  MethodName,
} from './ApiTypes';
import { handleErrors } from '@src/error-handling/ErrorHandlingUtils';

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

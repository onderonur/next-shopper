import { goTry } from 'go-try';
import { isHttpError } from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ApiErrorResponse } from './ErrorHandlingTypes';

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong';

export const handleErrors =
  (
    fn: (request: NextRequest) => Promise<NextResponse>,
  ): ((request: NextRequest) => Promise<NextResponse>) =>
  async (request) => {
    const [error, data] = await goTry(async () => {
      const response = await fn(request);
      return response;
    });

    if (!error) {
      return data;
    }

    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = DEFAULT_ERROR_MESSAGE;

    if (error instanceof ZodError) {
      statusCode = StatusCodes.BAD_REQUEST;
      message = error.issues.map((issue) => issue.message).join(', ');
    } else if (isHttpError(error)) {
      ({ statusCode } = error);
      ({ message } = error);
    }

    const errorResponse: ApiErrorResponse = { statusCode, message };

    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
    });
  };

export const ERROR_MESSAGES = {
  required: (label: string) => `${label} is required`,
  invalid: (label: string) => `${label} is invalid`,
};

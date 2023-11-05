import { goTry } from 'go-try';
import { StatusCodes } from 'http-status-codes';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import type { ApiErrorResponse } from './error-handling-types';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong';

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

    const ZodErrorSchema = z.instanceof(z.ZodError);
    const zodErrorResult = ZodErrorSchema.safeParse(error);

    if (zodErrorResult.success) {
      statusCode = StatusCodes.BAD_REQUEST;
      message = zodErrorResult.data.issues
        .map((issue) => issue.message)
        .join(', ');
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

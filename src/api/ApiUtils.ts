import { handleErrors } from '@/error-handling/ErrorHandlingUtils';
import { NextRequest, NextResponse } from 'next/server';

export const createHandler =
  (handler: (request: NextRequest) => Promise<NextResponse>) =>
  (request: NextRequest) => {
    return handleErrors(handler)(request);
  };

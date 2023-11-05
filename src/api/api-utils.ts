import { handleErrors } from '@/error-handling/error-handling-utils';
import type { NextRequest, NextResponse } from 'next/server';

export const createHandler =
  (handler: (request: NextRequest) => Promise<NextResponse>) =>
  (request: NextRequest) => {
    return handleErrors(handler)(request);
  };

import { createHandler } from '@/api/ApiUtils';
import { checkoutService } from '@/checkout/checkoutService';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export const POST = createHandler(async (request) => {
  const body = await request.json();

  await checkoutService.completeCheckout(body);

  return NextResponse.json(
    { statusCode: StatusCodes.CREATED },
    { status: StatusCodes.CREATED },
  );
});

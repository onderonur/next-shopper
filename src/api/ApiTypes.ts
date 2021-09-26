import { NextApiHandler } from 'next';

export type MethodName = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type BaseMethodHandlerSchema = Partial<Record<MethodName, unknown>>;

export type MethodHandlers<
  MethodHandlerSchema extends BaseMethodHandlerSchema,
> = Partial<{
  [Method in MethodName]: NextApiHandler<MethodHandlerSchema[Method]>;
}>;

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
}

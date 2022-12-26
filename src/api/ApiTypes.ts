import { NextApiHandler } from 'next';

export type MethodName = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type BaseMethodHandlerSchema = Partial<Record<MethodName, unknown>>;

export type MethodHandlers<
  MethodHandlerSchema extends BaseMethodHandlerSchema,
> = {
  [Method in keyof MethodHandlerSchema]: NextApiHandler<
    MethodHandlerSchema[Method]
  >;
};

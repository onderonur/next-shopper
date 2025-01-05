import type { z } from 'zod';

export type ServerActionState<Input, Data> =
  | { status: 'idle' }
  | { status: 'success'; data: Data }
  | {
      status: 'error';
      error?: string;
      fieldErrors?: z.ZodFormattedError<Input>;
    };

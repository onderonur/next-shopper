import type { z } from 'zod';

export type ServerActionState<Input, Data> =
  | { success: true; data: Data }
  | {
      success: false;
      error?: string;
      fieldErrors?: z.ZodFormattedError<Input>;
    };

import { z } from 'zod';

export type ServerActionResult<Input, Data> =
  | { success: true; data: Data }
  | {
      success: false;
      error?: string;
      fieldErrors?: z.ZodFormattedError<Input>;
    };

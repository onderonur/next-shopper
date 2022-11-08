import { AnyFunction, Maybe } from '@src/common/CommonTypes';
import { ApiRequestError } from '@src/error-handling/ErrorHandlingTypes';
import { goTry, GoTryResult } from 'go-try';
import { useCallback, useState } from 'react';

type Mutation<Fn extends AnyFunction> = (
  ...args: Parameters<Fn>
) => Promise<GoTryResult<ReturnType<Fn>, ApiRequestError>>;

// This hook does not handle race conditions.
// This is just a simple hook for demonstration purposes.
export function useMutation<Fn extends AnyFunction>(
  fn: Fn,
): {
  mutate: Mutation<Fn>;
  isLoading: boolean;
  isSuccess: boolean;
  error: Maybe<ApiRequestError>;
} {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Maybe<ApiRequestError>>(null);

  const mutate = useCallback<Mutation<Fn>>(
    async (...args) => {
      setIsLoading(true);
      setIsSuccess(false);
      setError(null);
      const result = await goTry<ReturnType<Fn>, ApiRequestError>(() =>
        fn(...args),
      );
      setIsLoading(false);
      const [err] = result;
      setIsSuccess(!err);
      setError(err);
      return result;
    },
    [fn],
  );

  return { mutate, isLoading, isSuccess, error };
}

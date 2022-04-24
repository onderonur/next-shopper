import { useCallback } from 'react';
import * as Yup from 'yup';
import { FieldError, FieldErrors } from 'react-hook-form';
import { goTry } from 'go-try';

// https://react-hook-form.com/advanced-usage/#CustomHookwithResolver
export const useYupValidationResolver = (validationSchema: Yup.AnySchema) =>
  useCallback(
    async (values: unknown) => {
      const [error, data] = await goTry(() =>
        validationSchema.validate(values, {
          abortEarly: false,
        }),
      );

      if (error) {
        return {
          values: {},
          errors: (error as Yup.ValidationError).inner.reduce(
            (allErrors: FieldErrors, yupError: Yup.ValidationError) => {
              const fieldError: FieldError = {
                type: yupError.type ?? 'validation',
                message: yupError.message,
              };
              return {
                ...allErrors,
                [yupError.path as string]: fieldError,
              };
            },
            {},
          ),
        };
      }

      return {
        values: data,
        errors: {},
      };
    },
    [validationSchema],
  );

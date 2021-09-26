import { useCallback } from 'react';
import * as Yup from 'yup';
import { FieldError, FieldErrors } from 'react-hook-form';

// https://react-hook-form.com/advanced-usage/#CustomHookwithResolver
export const useYupValidationResolver = (validationSchema: Yup.AnySchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: (errors as Yup.ValidationError).inner.reduce(
            (allErrors: FieldErrors, yupError: Yup.ValidationError) => {
              const error: FieldError = {
                type: yupError.type ?? 'validation',
                message: yupError.message,
              };
              return {
                ...allErrors,
                [yupError.path as string]: error,
              };
            },
            {},
          ),
        };
      }
    },
    [validationSchema],
  );

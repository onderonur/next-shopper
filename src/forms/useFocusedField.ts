import React, { useState } from 'react';
import { UseFormRegisterReturn, FieldPath, FieldValues } from 'react-hook-form';

export function useFocusedField<FormFieldValues extends FieldValues>() {
  const [focusedField, setFocusedField] =
    useState<FieldPath<FormFieldValues>>();

  const focusHandlers = (registerResult: UseFormRegisterReturn) => {
    const onFocus = () => {
      setFocusedField(registerResult.name as FieldPath<FormFieldValues>);
    };

    const onBlur: React.ComponentPropsWithoutRef<'input'>['onBlur'] = (e) => {
      setFocusedField(undefined);
      registerResult.onBlur(e);
    };

    return { ...registerResult, onFocus, onBlur };
  };

  return { focusedField, focusHandlers };
}

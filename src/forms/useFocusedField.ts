import React, { useState } from 'react';
import { UseFormRegisterReturn, FieldPath } from 'react-hook-form';

export function useFocusedField<FieldValues>() {
  const [focusedField, setFocusedField] = useState<FieldPath<FieldValues>>();

  const focusHandlers = (registerResult: UseFormRegisterReturn) => {
    const onFocus = () => {
      setFocusedField(registerResult.name as FieldPath<FieldValues>);
    };

    const onBlur: React.ComponentPropsWithoutRef<'input'>['onBlur'] = (e) => {
      setFocusedField(undefined);
      registerResult.onBlur(e);
    };

    return { ...registerResult, onFocus, onBlur };
  };

  return { focusedField, focusHandlers };
}

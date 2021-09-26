import { useState } from 'react';

export const useFocusedField = <Path>() => {
  const [focusedField, setFocusedField] = useState<Path>();

  const focusHandlers = (name: Path) => {
    const onFocus = () => setFocusedField(name);
    const onBlur = () => setFocusedField(undefined);
    return { onFocus, onBlur };
  };

  return { focusedField, focusHandlers };
};

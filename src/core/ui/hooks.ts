import { useOnPathnameChange, useOnRouteChange } from '@/core/routing/hooks';
import { useState } from 'react';

export type UseAutoClosableArgs = {
  closeOnRouteChange?: boolean;
  closeOnPathnameChange?: boolean;
};

export function useAutoClosable({
  closeOnRouteChange,
  closeOnPathnameChange,
}: UseAutoClosableArgs = {}) {
  const [isOpen, setIsOpen] = useState(false);

  useOnRouteChange(
    closeOnRouteChange
      ? () => {
          setIsOpen(false);
        }
      : null,
  );

  useOnPathnameChange(
    closeOnPathnameChange
      ? () => {
          setIsOpen(false);
        }
      : null,
  );

  return [isOpen, setIsOpen] as const;
}

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

  useOnRouteChange(() => {
    if (!closeOnRouteChange) return;
    setIsOpen(false);
  });

  useOnPathnameChange(() => {
    if (!closeOnPathnameChange) return;
    setIsOpen(false);
  });

  return [isOpen, setIsOpen] as const;
}

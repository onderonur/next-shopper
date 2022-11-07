import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const useOnPathnameChange = (handler: VoidFunction) => {
  const pathname = usePathname();
  const handlerRef = useRef<VoidFunction>(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    return () => {
      handlerRef.current();
    };
  }, [pathname]);
};

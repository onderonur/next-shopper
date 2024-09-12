import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

// https://nextjs.org/docs/app/api-reference/functions/use-pathname#do-something-in-response-to-a-route-change
export function useOnRouteChange(handler: VoidFunction | null) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const savedCallbackRef = useRef<VoidFunction | null>(handler);

  useEffect(() => {
    savedCallbackRef.current = handler;
  }, [handler]);

  useEffect(() => {
    return () => {
      savedCallbackRef.current?.();
    };
  }, [pathname, searchParams]);
}

export function useOnPathnameChange(handler: VoidFunction | null) {
  const pathname = usePathname();
  const savedCallbackRef = useRef<VoidFunction | null>(handler);

  useEffect(() => {
    savedCallbackRef.current = handler;
  }, [handler]);

  useEffect(() => {
    return () => {
      savedCallbackRef.current?.();
    };
  }, [pathname]);
}

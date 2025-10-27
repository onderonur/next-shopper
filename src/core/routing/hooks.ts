import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useEffectEvent } from 'react';

// https://nextjs.org/docs/app/api-reference/functions/use-pathname#do-something-in-response-to-a-route-change
export function useOnRouteChange(handler: VoidFunction) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChange = useEffectEvent(handler);

  useEffect(() => {
    return () => {
      onChange();
    };
  }, [pathname, searchParams]);
}

export function useOnPathnameChange(handler: VoidFunction) {
  const pathname = usePathname();

  const onChange = useEffectEvent(handler);

  useEffect(() => {
    return () => {
      onChange();
    };
  }, [pathname]);
}

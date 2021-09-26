import { Maybe } from '@src/common/CommonTypes';
import { RouterEvent, useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

export const useRouterEvent = (name: RouterEvent, cb: Maybe<VoidFunction>) => {
  const router = useRouter();

  // https://nextjs.org/docs/api-reference/next/router#usage-6
  useEffect(() => {
    if (cb) {
      router.events.on(name, cb);

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
      return () => {
        router.events.off(name, cb);
      };
    }
  }, [cb, name, router.events]);
};

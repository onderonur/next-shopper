import { useMemo, useSyncExternalStore } from 'react';

const createMediaQueryStore = (query: string) => {
  const media = typeof window === 'undefined' ? null : window.matchMedia(query);

  return {
    subscribe: (listener: VoidFunction) => {
      function handleChange() {
        listener();
      }

      media?.addEventListener('change', handleChange);

      return () => {
        media?.removeEventListener('change', handleChange);
      };
    },
    getSnapshot: () => {
      return media?.matches ?? false;
    },
    getServerSnapshot: () => {
      return false;
    },
  };
};

function useMediaQuery(query: string) {
  const mediaQueryStore = useMemo(() => createMediaQueryStore(query), [query]);

  const matches = useSyncExternalStore(
    mediaQueryStore.subscribe,
    mediaQueryStore.getSnapshot,
    mediaQueryStore.getServerSnapshot,
  );

  return matches;
}

export function useIsMobile() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  return isMobile;
}

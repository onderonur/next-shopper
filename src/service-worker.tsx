'use client';

import { useEffect } from 'react';

export function ServiceWorker() {
  useEffect(() => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log(
          'Service Worker registration successful with scope:',
          registration.scope,
        );
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  }, []);

  return null;
}

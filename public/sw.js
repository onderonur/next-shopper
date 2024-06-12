importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js',
);

workbox.recipes.offlineFallback();

const pageFallback = '/offline';
const imageFallback = false;
const fontFallback = false;

workbox.routing.setDefaultHandler(new workbox.strategies.NetworkOnly());

self.addEventListener('install', (event) => {
  const files = [pageFallback];
  if (imageFallback) {
    files.push(imageFallback);
  }
  if (fontFallback) {
    files.push(fontFallback);
  }

  event.waitUntil(
    self.caches
      .open('workbox-offline-fallbacks')
      .then((cache) => cache.addAll(files)),
  );
});

const handler = async (options) => {
  const dest = options.request.destination;
  const cache = await self.caches.open('workbox-offline-fallbacks');

  if (dest === 'document') {
    return (await cache.match(pageFallback)) || Response.error();
  }

  console.log('dest', dest);

  if (dest === 'image' && imageFallback !== false) {
    return (await cache.match(imageFallback)) || Response.error();
  }

  if (dest === 'font' && fontFallback !== false) {
    return (await cache.match(fontFallback)) || Response.error();
  }

  return Response.error();
};

workbox.routing.setCatchHandler(handler);

import { Install } from './types';
const controller = (e: Install.Event, options: { cachePaths: string[]; cacheName: string }) => {
  e.waitUntil(
    caches.open(options.cacheName).then((res) => {
      res.addAll(options.cachePaths);
    })
  );
};
export default { controller };

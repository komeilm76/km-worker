import { Install } from './types';
const controller = (e: Install.Event, options: { cachePaths: string[] }) => {
  e.waitUntil(
    caches.open('v1').then((res) => {
      res.addAll(options.cachePaths);
    })
  );
};
export default { controller };

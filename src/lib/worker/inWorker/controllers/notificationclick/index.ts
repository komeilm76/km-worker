import { NotificationClick } from './types';
const controller = (
  e: NotificationClick.Event,
  options: { openType: 'new-window' | 'active-window' }
) => {
  // @ts-ignore
  const cl = clients as NotificationClick.Clients;
  if (options.openType == 'new-window') {
    e.notification.close();

    e.waitUntil(cl.openWindow(e.notification.data));
  } else if (options.openType == 'active-window') {
    e.notification.close();

    const urlToOpen = new URL('/', self.location.origin).href;

    e.waitUntil(
      cl
        .matchAll({ type: 'window', includeUncontrolled: true })

        .then((windowClients) => {
          for (let client of windowClients) {
            if (client.url === urlToOpen && 'focus' in client) {
              // Try to focus, but catch errors
              return client.focus().catch(() => {
                // If focus fails, open a new window

                if (cl.openWindow) {
                  return cl.openWindow(urlToOpen);
                }
              });
            }
          }
          // If no matching client, open a new window

          if (cl.openWindow) {
            return cl.openWindow(urlToOpen);
          }
        })
    );
  }
};
export default { controller };

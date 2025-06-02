/** @format */

import chalk from 'chalk';

type IRegisteryItemOptions = {
  scope?: string;
  type?: WorkerType;
  updateViaCache?: 'all' | 'imports' | 'none';
};

type IRegisterEntry<PATH extends string> = {
  path: PATH;
  onRegisteration: (registration: ServiceWorkerRegistration) => void;
  onError: (error: any) => void;
  options: IRegisteryItemOptions;
};

const addRegisterOptions = <OPTIONS extends IRegisteryItemOptions>(entry: OPTIONS) => {
  return entry;
};

type IRegisteryOptions = {
  autoRegisterLog: boolean;
  autoErrorLog: boolean;
};
const register = <PATH extends string, ENTRY extends IRegisterEntry<PATH>, ENTRIES extends ENTRY[]>(
  pathList: [...ENTRIES],
  entryOptions?: Partial<IRegisteryOptions>
) => {
  const options: IRegisteryOptions = {
    autoErrorLog: true,
    autoRegisterLog: true,
    ...entryOptions,
  };
  if ('serviceWorker' in navigator) {
    pathList.map((item) => {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register(item.path, item.options).then(
          (registration) => {
            if (options.autoRegisterLog == true) {
              console.log(
                chalk.green(
                  `[service worker ${item.path} on scope: ${registration.scope} registered]`
                )
              );
            }
            item.onRegisteration(registration);
          },
          (error) => {
            if (options.autoErrorLog == true) {
              console.log(chalk.red(`[error on register ${item.path}]`), error);
            }
            item.onError(error);
          }
        );
      });
    });
  }
};

const makeSubscription = (PUBLIC_KEY: string) => {
  return new Promise<PushSubscription>((rs, rj) => {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: PUBLIC_KEY,
          })
          .then((subscription) => {
            rs(subscription);
          })
          .catch((error) => {
            rj(error);
          });
      })
      .catch((error) => {
        rj(error);
      });
  });
};

const sendNotificationPermissionRequest = () => {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission((status) => {
      console.log('notification permission status:', status);
    });
  }
};

export default {
  register,
  addRegisterOptions,
  makeSubscription,
  sendNotificationPermissionRequest,
};

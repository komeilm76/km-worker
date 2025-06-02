/** @format */

import controllers from './controllers';

type IWorkerEvent =
  | 'install'
  | 'activate'
  | 'fetch'
  | 'push'
  | 'notificationclick'
  | 'notificationclose'
  | 'sync'
  | 'canmakepayment'
  | 'paymentrequest'
  | 'message'
  | 'messageerror';

let eventTypeList = [
  'install',
  'activate',
  'fetch',
  'push',
  'notificationclick',
  'notificationclose',
  'sync',
  'canmakepayment',
  'paymentrequest',
  'message',
  'messageerror',
];

const selectEventName = <EVENT extends IWorkerEvent>(event: EVENT) => {
  return event;
};

type IEventHandlerEntry<NAME extends IWorkerEvent> = {
  name: NAME;
  action: (event: Event) => void;
};

const event = <EVENT extends IWorkerEvent, ENTRY extends IEventHandlerEntry<EVENT>>(
  entry: ENTRY
) => {
  return entry;
};

const listen = <
  EVENT extends IWorkerEvent,
  ENTRY extends IEventHandlerEntry<EVENT>,
  ENTRIES extends ENTRY[]
>(
  entries: [...ENTRIES]
) => {
  return entries.forEach((item) => {
    self.addEventListener(item.name, (event) => {
      console.log(`worker-event:${item.name}`, event);
      item.action(event);
    });
  });
};

type IWorkerConfig<
  WORKER_NAME extends string,
  CACHE_NAME extends string,
  EVENT extends IWorkerEvent,
  EVENTS extends IEventHandlerEntry<EVENT>[]
> = {
  name: WORKER_NAME;
  cacheName: CACHE_NAME;
  path: string;
  listeners: [...EVENTS];
};
const makeWorkerConfig = <
  CONFIG extends IWorkerConfig<WORKER_NAME, CACHE_NAME, EVENT, [...EVENTS]>,
  EVENT extends IWorkerEvent,
  EVENTS extends IEventHandlerEntry<EVENT>[],
  WORKER_NAME extends string,
  CACHE_NAME extends string
>(
  config: CONFIG
) => {
  return config;
};

export default {
  makeWorkerConfig,
  listen,
  event,
  selectEventName,
  eventTypeList,
  controllers,
};

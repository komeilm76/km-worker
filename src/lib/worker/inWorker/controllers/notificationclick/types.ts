export namespace NotificationClick {
  export type Event = {
    type: 'notificationclick';
    action: string;
    replay: null | any;
    notification: Notification;
    waitUntil: Function;
  };
  export type Clients = {
    openWindow: Function;
    matchAll: (args: {
      type: string;
      includeUncontrolled: boolean;
    }) => Promise<{ url: string; focus: () => Promise<any> }[]>;
  };
}

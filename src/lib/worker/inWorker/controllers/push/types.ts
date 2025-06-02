export namespace Push {
  export type PushMessageData = {
    [key: string]: any;
  };

  export type PushEvent = {
    data: PushMessageData;
    type: 'push';
    waitUntil: Function;
  };
}

type IShowNotificationArgs = [
  title: string,
  options: {
    body: string;
    icon: string;
    badge: string;
    data: string;
  }
];

export type IControllerOptions = {
  titleKey: string;
  bodyKey: string;
  iconKey: string;
  badgeKey: string;
  dataKey: string;
  defaultAppRoute: string;
  defaultTitle: string;
  defaultBody: string;
};

export type ISelf = Window &
  typeof globalThis & {
    registration: {
      showNotification: (...args: IShowNotificationArgs) => void;
    };
  };

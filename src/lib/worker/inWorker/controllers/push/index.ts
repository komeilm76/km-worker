import { IControllerOptions, ISelf, Push } from './types';

const controller = (e: Push.PushEvent, entryOptions: Partial<IControllerOptions>) => {
  const configOptions: IControllerOptions = {
    titleKey: 'title',
    bodyKey: 'body',
    iconKey: 'icon',
    badgeKey: 'badge',
    dataKey: 'data',
    defaultAppRoute: '/',
    defaultTitle: 'New Notification',
    defaultBody: 'Message',
    ...entryOptions,
  };
  const data = e.data ? e.data.json() : {};
  const title = data[configOptions.titleKey] || entryOptions.defaultTitle;
  const options = {
    body: data[configOptions.bodyKey] || entryOptions.defaultBody,
    icon: data[configOptions.iconKey],
    badge: data[configOptions.badgeKey],
    data: data[configOptions.dataKey] || entryOptions.defaultAppRoute,
  };
  e.waitUntil((self as ISelf).registration.showNotification(title, options));
};
export default { controller };

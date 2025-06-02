import chalk from 'chalk';
import kmList from 'km-list';
import _ from 'lodash';

const tabing = (size: number = 1) => {
  return Array.from({ length: size })
    .map(() => ' ')
    .join('');
};

type IMakePathOptions = {
  tabSize: number;
  showRoot: boolean;
};
const makePathMap = (path: string, entryOptions: Partial<IMakePathOptions> = {}) => {
  let options: IMakePathOptions = {
    tabSize: 2,
    showRoot: false,
    ...entryOptions,
  };

  if (path.startsWith('/')) {
    path = path.substring(1);
  }

  let list = path.split('/').map((item) => {
    item = `|_ ${item}`;
    return item;
  });
  let outputList = [...(entryOptions.showRoot == true ? ['root'] : []), ...list];
  let output = '';
  let tab = '';
  outputList.forEach((item, index) => {
    const isLast = kmList.isLastElement(outputList, index);
    if (item.match('root')) {
      output = `${output}${item}\n`;
    } else {
      if (isLast) {
        output = `${output}${tab}${item}`;
        tab = tab + tabing(options.tabSize);
      } else {
        output = `${output}${tab}${item}\n`;
        tab = tab + tabing(options.tabSize);
      }
    }
  });
  return output;
};
const makePathListMap = <
  PATH extends string,
  ENTRY extends { path: PATH } & Partial<IMakePathOptions>
>(
  entries: ENTRY[]
) => {
  return entries
    .map((item) => {
      return makePathMap(item.path, {
        ...(item.showRoot && { showRoot: item.showRoot }),
        ...(item.tabSize && { tabSize: item.tabSize }),
      });
    })
    .join('\n');
};

const helpMessage = [
  `example:`,
  ``,
  chalk.blue(`npm i web-push`),
  ``,
  `with web push package you can generate public key for sendNotification from backend and save as env inside client app`,
  ``,
  `-----Repository-----`,
  ``,
  chalk.black(
    makePathListMap([
      { path: '/src/worker/index.ts', showRoot: true },
      { path: '/public/worker.js' },
      { path: '/package.json' },
    ])
  ),
  ``,
  `-----Repository-----`,
  ``,
  chalk.blue('please add this script inside package.json file:'),
  ``,
  `${chalk.yellow(`"scripts": {
    ${chalk.green(
      `+"generate-worker": "npx esbuild ./src/worker/index.ts --bundle --outfile=./public/worker.js --platform=browser --target=es2018"`
    )}
  },`)}`,
  ``,
  chalk.blue(`add this code inside client application script file`),
  ``,
  `kmWorker.inApp.register([`,
  `  {`,
  `    path: '/worker.js',`,
  `    options: {`,
  `      scope: '/',`,
  `      type: 'classic',`,
  `    },`,
  `    onRegisteration: () => {},`,
  `    onError: () => {},`,
  `  },`,
  `]);`,
  ` `,
  `kmWorker.inApp.sendNotificationPermissionRequest();`,
  `kmWorker.inApp.makeSubscription(import.meta.env.VITE_VAPID_PUBLIC_KEY).then((subscription) => {`,
  `  // you can send this subscription to backend and save for use to send notification`,
  `  fetch('http://localhost:4000/subscribe', {`,
  `    method: 'POST',`,
  `    headers: {`,
  `      'Content-Type': 'application/json',`,
  `    },`,
  `    body: JSON.stringify(subscription),`,
  `  });`,
  `});`,
  ``,
  `import kmWorker from "km-worker";`,
  ` `,
  `const { listen, makeWorkerConfig } = kmWorker.inWorker;`,
  ` `,
  `const config = makeWorkerConfig({`,
  `  name: "application-worker",`,
  `  path: "/worker.js",`,
  `  cacheName: "v1",`,
  `});`,
  ` `,
  chalk.blue(`add this code inside service worker script file`),
  ``,
  `listen([`,
  `  {`,
  `    name: "install",`,
  `    action: (e) => {`,
  `      // @ts-ignore`,
  `      kmWorker.inWorker.controllers.install.controller(e, {`,
  `        cacheName: config.cacheName,`,
  `        cachePaths: ["/"],`,
  `      });`,
  `    },`,
  `  },`,
  `  {`,
  `    name: "activate",`,
  `    action: (e) => {`,
  `      // @ts-ignore`,
  `      kmWorker.inWorker.controllers.activate.controller(e);`,
  `    },`,
  `  },`,
  `  {`,
  `    name: "push",`,
  `    action: (e) => {`,
  `      // @ts-ignore`,
  `      kmWorker.inWorker.controllers.push.controller(e, {});`,
  `    },`,
  `  },`,
  `  {`,
  `    name: "notificationclick",`,
  `    action: (e) => {`,
  `      // @ts-ignore`,
  `      kmWorker.inWorker.controllers.notificationclick.controller(e, {`,
  `        openType: "active-window",`,
  `      });`,
  `    },`,
  `  },`,
  `]);`,
];

const help = () => {
  return helpMessage
    .map((item) => {
      return item;
    })
    .join('\t\n');
};
export default { help };

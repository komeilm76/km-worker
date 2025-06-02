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
  'please add this script inside package.json file:',
  ``,
  `${chalk.yellow(`"scripts": {
    ${chalk.green(
      `+"generate-worker": "npx esbuild ./src/worker/index.ts --bundle --outfile=./public/worker.js --platform=browser --target=es2018"`
    )}
  },`)}`,
  `use inApp.register in application main file and insert worker address`,
  `use inApp.register in application main file and insert worker address`,
];

const help = () => {
  return helpMessage
    .map((item) => {
      return item;
    })
    .join('\t\n');
};
export default { help };

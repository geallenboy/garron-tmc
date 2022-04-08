import path from 'path';
import { Command } from 'commander';
import { actionInit, actionInstall, actionStart } from './action';

const program = new Command();
const context = path.resolve(__dirname, '..');

const version = () => {
  const pkg = require(path.resolve(context, 'package.json'));
  program.usage('<command> [options]').version(pkg.version, '-v,--version');
};

const options = () => {
  program.option('-i, init', '初始化项目').option('-in, install', '安装npm包');
};

const init = () => {
  program
    .command('init')
    .option('-r, --registry [url]', 'npm registry, default https://registry.npmjs.org')
    .description('初始化模版')
    .action((options) => {
      actionInit(options);
    });
};

const install = () => {
  program
    .command('install')
    .option('-m,--mode [mode]', 'mode: npm,yarn,pnpm')
    .description('动态安装缺少npm模块')
    .action((options) => {
      console.log(process.cwd());
      actionInstall(options);
    });
};
const start = () => {
  program
    .command('start')
    .option('-s,--start [start]', 'start: vite,webpack')
    .description('启动服务')
    .action((options) => {
      console.log(options);
      actionStart(options);
    });
};

const test = () => {
  program
    .command('test')
    .description('单元测')
    .action((options) => {
      console.log('test1', options);
    });
};

const parse = () => {
  program.parse(process.argv);
};

const run = () => {
  version();
  options();
  init();
  install();
  start();
  test();
  parse();
};

run();

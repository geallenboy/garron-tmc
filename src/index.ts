import path from 'path';
import { Command } from 'commander';
import { actionInit } from './action';

const program = new Command();
const context = path.resolve(__dirname, '..');

const version = () => {
  const pkg = require(path.resolve(context, 'package.json'));
  program.usage('<command> [options]').version(pkg.version, '-v,--version');
};

const options = () => {
  program.option('-i, init', '初始化项目');
};

const init = () => {
  program
    .command('init')
    .option(
      '-r, --registry [url]',
      'npm registry, default https://registry.npmjs.org, you can taobao registry: https://registry.npm.taobao.org',
    )
    .description('初始化模版')
    .action(() => {
      actionInit();
    });
};
const install = () => {
  program
    .command('install')
    .option('--mode [mode]', 'mode: npm,yarn')
    .description('动态安装webpack缺少npm模块')
    .action((options) => {
      console.log(options);
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
  test();
  parse();
};

run();

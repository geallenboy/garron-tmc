import chalk from 'chalk';
import { proName } from './config';

export const success = (msg, ex = '') => {
  console.log(chalk.blueBright(`[${proName.name}] ${chalk.green(msg)}`), ex);
};
export const error = (msg, ex = '') => {
  console.log(chalk.blueBright(`[${proName.name}] ${chalk.red(msg)}`), ex);
};

export const info = (msg, ex = '') => {
  console.log(chalk.blueBright(`[${proName.name}] ${chalk.yellow(msg)}`), ex);
};

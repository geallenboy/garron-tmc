import path from 'path';
import fs from 'fs';
import assert from 'assert';
import urllib from 'urllib';
import mkdirp from 'mkdirp';
import shell from 'shelljs';
import ora from 'ora';
import compressing from 'compressing';
import { registry, tempDir } from './config';
import { success, error } from './logger';
import rimraf from 'rimraf';
import { askChoiceType, projectInfoAnswerType } from 'type';

/**
 * 更新远程下载的package.json文件
 * @param {string} fileDir 文件目录
 * @param {object} info 文件信息
 */
export const updatePackageFile = (fileDir: string, info: any) => {
  const { name, description } = info;
  const filepath = path.join(fileDir, 'package.json');
  const packageJSON = require(filepath);
  packageJSON.name = name || packageJSON.name;
  packageJSON.version = '1.0.0';
  packageJSON.description = description || packageJSON.description;
  writeFile(filepath, packageJSON);
};

/**
 * 获取package信息
 * @param {*} pkgName
 * @returns
 */
export const getPackageInfo = async (pkgName: any) => {
  success(`查询npm ${pkgName} 信息`);
  const url = `${registry}/${pkgName}/latest`;
  const result = await urllib.request(url, {
    dataType: 'json',
    followRedirect: true,
    timeout: 10000
  });
  assert(
    result.status === 200,
    `npm info ${pkgName} got error: ${result.status}, ${result.data.reason}`
  );
  return result.data;
};
/**
 * 下载远程操作
 * @param {string} pkgName
 * @param {string} dir
 */
export const download = async (pkgName: string) => {
  const result = await getPackageInfo(pkgName);
  const tgzUrl = result.dist.tarball;
  console.log(tempDir, 'tempDir');
  await rimraf(tempDir, function (err) {
    console.log(err, '删除缓存目录');
  }); // 删除缓存目录
  success(`下载中...${tgzUrl}`);
  const response: any = await urllib.request(tgzUrl, {
    streaming: true,
    followRedirect: true
  });
  const targetDir = path.join(tempDir, pkgName);
  await compressing.tgz.uncompress(response.res, targetDir); // 解压
  success(`解压到 ${tempDir}`);
  return path.join(targetDir, 'package');
};

/**
 * 下载npm 包
 * @param {*} npm
 */
export const installDeps = async (npm: string) => {
  if (npm) {
    const cmd = `${npm} install`;
    const spinner = ora(`start ${cmd}...`);
    spinner.start();
    const result = shell.exec(cmd);
    if (result) {
      if (result.code === 0) {
        success(`${cmd} successfully!`);
      } else {
        error(`${cmd} error`, result.stderr);
      }
    }
    spinner.stop();
  }
};

/**
 * 启动信息
 * @param {string} projectName
 */
export const quickStart = (projectName: string) => {
  const steps = [];
  steps.push(`1) cd ${projectName}`);
  steps.push(`2) npm install or yarn install or pnpm install`);
  steps.push(`3) ${'npm run start'}`);
  success(`按照下面的步骤开始执行:\r\n${steps.join('\r\n')}`);
};

/**
 * 初始化下载信息
 * @param {sting} root 当前目录
 * @param {object} bilerplateInfo 模版信息
 * @param {object} projectInfoAnswer 用户选择项目信息
 */
export const downInit = async (
  root: string,
  bilerplateInfo: askChoiceType,
  projectInfoAnswer: projectInfoAnswerType
) => {
  const { pkgName, value } = bilerplateInfo;
  const { name, npm, packages } = projectInfoAnswer;
  const projectName = name || value || pkgName;
  console.log(projectName, npm, packages, root);
  const absSourceDir = await download(pkgName); // 获取下载本地缓存目录
  const absTargetDir = path.join(root, projectName); // 下载到当前目录
  await mkdirp(absTargetDir); // 创建当前目录
  copy(absSourceDir, absTargetDir); // 本地缓存目录复制到当前目录
  updatePackageFile(absTargetDir, projectInfoAnswer); // 更新package内部信息
  success(`初始化 ${projectName} 项目成功!\r\n`);
  if (packages === 'yes') {
    installDeps(npm);
  }
  quickStart(projectName);
};

export const copy = (sourceDir: string, targetDir: string, option = { dir: '', hide: true }) => {
  if (option.dir) {
    shell.cp('-R', path.join(sourceDir, option.dir), targetDir);
  } else {
    shell.cp('-R', path.join(sourceDir, '*'), targetDir);
    if (option.hide) {
      try {
        shell.cp('-R', path.join(sourceDir, '.*'), targetDir);
      } catch (e) {
        console.warn('copy hide file error', e);
      }
    }
  }
};
export const writeFile = (filepath: string, content: string | NodeJS.ArrayBufferView) => {
  try {
    mkdirp.sync(path.dirname(filepath));
    fs.writeFileSync(
      filepath,
      typeof content === 'string' ? content : JSON.stringify(content, null, 2),
      'utf8'
    );
  } catch (error) {
    error(`writeFile ${filepath} err`, error);
  }
};

/**
 * 读取文件
 * @param {string} filepath 文件路径
 * @returns {Object}
 */
export const readFile = (filepath) => {
  try {
    if (fs.existsSync(filepath)) {
      return true;
    }
    return false;
  } catch (error) {
    console.warn(`readFile ${filepath} err`, error);
    return false;
  }
};
/**
 * 删除文件
 * @param {string} filepath 路径名称
 */
export const deleteFile = (filepath) => {
  if (fs.existsSync(filepath)) {
    if (fs.statSync(filepath).isDirectory) {
      const files = fs.readFileSync(filepath);
      files.forEach((file: any) => {
        const curPath = path.join(filepath, file);
        if (fs.statSync(curPath).isDirectory) {
          exports.deleteFile(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.unlinkSync(filepath);
    } else {
      fs.unlinkSync(filepath);
    }
  }
};

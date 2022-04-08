import inquirer from 'inquirer';
import shell from 'shelljs';
import {
  npmList,
  askChoice,
  askDetailChoice,
  askProjectChoice,
  getBoilerplateInfo,
  getProjectAskChoices,
  getBoilerplateDetailInfo
} from './boilerplate';
import { downInit, installDeps } from './download';
import { projectDir } from './config';
import {
  askChoiceType,
  boilerplateAnswerType,
  askProjectChoiceType,
  projectType,
  projectInfoAnswerType
} from './type';
import ora from 'ora';
import { success, error } from './logger';

export const actionStart = (options) => {
  let cmd = 'vite';
  if (!options?.start) {
    cmd = 'vite';
  } else {
    cmd = options?.start;
  }
  const spinner = ora(`start1 ${cmd}...`);
  spinner.start();
  const result = shell.exec(`npm run start`);
  if (result) {
    if (result.code === 0) {
      success(`${cmd} successfully!`);
    } else {
      error(`${cmd} error`, result.stderr);
    }
  }
  spinner.stop();
};

/**
 * install
 *
 */
export const actionInstall = async (options) => {
  let npmName = 'npm';
  if (!options?.mode) {
    const npmInfo = await inquirer.prompt([npmList]);
    npmName = npmInfo.npm;
  } else {
    npmName = options?.mode;
  }
  installDeps(npmName);
};

/**
 * init
 * @param {boject} options
 */
export const actionInit = async (options) => {
  console.log(options, 'options');
  const boilerplateAnswer: boilerplateAnswerType = await inquirer.prompt([
    {
      type: 'list',
      name: 'boilerplateName',
      message: '请选择项目构建类型?',
      choices: askChoice
    }
  ]);

  const boilerplateName: string = boilerplateAnswer.boilerplateName;
  const boilerplateInfo: askChoiceType = getBoilerplateInfo(askChoice, boilerplateName);

  const choices = boilerplateInfo.choices;

  if (askDetailChoice[boilerplateName]) {
    const boilerplateDetailAsk: askProjectChoiceType[] = [
      {
        type: 'list',
        name: 'project',
        message: '请选择应用程序?',
        choices: askDetailChoice[boilerplateName]
      }
    ];
    const boilerplateDetailAnswer: projectType = await inquirer.prompt(boilerplateDetailAsk);
    const project: string = boilerplateDetailAnswer.project;
    const bilerplateInfo: askChoiceType = getBoilerplateDetailInfo(
      askDetailChoice,
      boilerplateName,
      project
    );
    const projectInfoChoice: askProjectChoiceType[] = getProjectAskChoices(
      askProjectChoice,
      bilerplateInfo.choices || choices
    );
    const projectInfoAnswer: projectInfoAnswerType = await inquirer.prompt(projectInfoChoice);
    await downInit(projectDir, bilerplateInfo, projectInfoAnswer);
  }
};

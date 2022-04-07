import inquirer from 'inquirer';
import {
  askChoice,
  askDetailChoice,
  askProjectChoice,
  getBoilerplateInfo,
  getProjectAskChoices,
  getBoilerplateDetailInfo,
} from './boilerplate';
import { downInit } from './download';
import { projectDir } from './config';
import { askChoiceType,boilerplateAnswerType,askProjectChoiceType,projectType } from './type';

/**
 * init
 * @param {boject} options
 */
export const actionInit = async () => {
  const boilerplateAnswer:boilerplateAnswerType = await inquirer.prompt([
    {
      type: 'list',
      name: 'boilerplateName',
      message: '请选择项目构建类型?',
      choices: askChoice,
    },
  ]);
 
  const boilerplateName:string = boilerplateAnswer.boilerplateName;
  const boilerplateInfo:askChoiceType = getBoilerplateInfo(askChoice, boilerplateName);
 
  const choices = boilerplateInfo.choices;

  if (askDetailChoice[boilerplateName]) {
    const boilerplateDetailAsk:askProjectChoiceType[] = [
      {
        type: 'list',
        name: 'project',
        message: '请选择应用程序?',
        choices: askDetailChoice[boilerplateName],
      },
    ];
    const boilerplateDetailAnswer:projectType = await inquirer.prompt(boilerplateDetailAsk);
    const project:string = boilerplateDetailAnswer.project;
    const bilerplateInfo:askChoiceType = getBoilerplateDetailInfo(askDetailChoice, boilerplateName, project);
   
    const projectInfoChoice:askProjectChoiceType[] = getProjectAskChoices(
      askProjectChoice,
      bilerplateInfo.choices || choices,
    );
   
    const projectInfoAnswer = await inquirer.prompt(projectInfoChoice);
    console.log(projectInfoAnswer,222)
    // await downInit(projectDir, bilerplateInfo, projectInfoAnswer);
  }
};

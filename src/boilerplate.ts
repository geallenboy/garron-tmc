import chalk from 'chalk';
import { askChoiceType, askDetailChoiceType, askProjectChoiceType } from './type';

/**
 * 获取模版信息
 * @param {array} boilerplateChoice
 * @param {string} name
 * @returns
 */
export const getBoilerplateInfo = (boilerplateChoice: askChoiceType[], name: string) => {
  return boilerplateChoice.find((item: askChoiceType) => {
    return name === item.value;
  });
};

/**
 * 获取项目问答选择
 * @param {array} projectAskChoice
 * @param {array} ranges
 * @returns
 */
export const getProjectAskChoices = (projectAskChoice, ranges) => {
  if (ranges === undefined) {
    return projectAskChoice;
  }
  return ranges.map((rag) => {
    return projectAskChoice.filter((choice) => {
      return choice.name === rag;
    })[0];
  });
};
/**
 * 获取模版详细信息
 * @param {array} boilerplateDetailChoice
 * @param {array} boilerplate
 * @param {string} project
 * @returns
 */
export const getBoilerplateDetailInfo = (boilerplateDetailChoice, boilerplate, project) => {
  const filterItems = boilerplateDetailChoice[boilerplate].filter((item) => project === item.value);
  return filterItems.length > 0 ? filterItems[0] : null;
};
/**
 * 项目构建类型
 */
export const askChoice: askChoiceType[] = [
  {
    name: `创建 ${chalk.green('vite')} 应用程序`,
    value: 'vite'
  },
  {
    name: `创建 ${chalk.green('webpack')} 应用程序`,
    value: 'webpack'
  },
  {
    name: `创建 ${'NPM/HTML'} 应用程序`,
    value: 'npm'
  }
];

//项目应用程序选择
export const askDetailChoice: askDetailChoiceType = {
  vite: [
    {
      name: `创建 ${'vite2-vue3-jsx'} 应用程序`,
      value: 'vite2-vue3-jsx',
      pkgName: '@garron/vite2-vue3-jsx'
    },
    {
      name: `创建 ${'vite2-react17'} 应用程序`,
      value: 'vite2-react17',
      pkgName: '@garron/vite2-react17'
    },
    {
      name: `创建 ${'template-vue3-jsx-pinia-antd'} 应用程序`,
      value: 'template-vue3-jsx-pinia-antd',
      pkgName: '@garron/template-vue3-jsx-pinia-antd'
    },
    {
      name: `创建 ${'template-react17-recoil-antd '} 应用程序`,
      value: 'template-react17-recoil-antd ',
      pkgName: '@garron/template-react17-recoil-antd '
    },
    {
      name: `创建 ${'template-react17-redux-antd '} 应用程序`,
      value: 'template-react17-redux-antd ',
      pkgName: '@garron/template-react17-redux-antd '
    }
  ],
  webpack: [
    {
      name: `创建 ${'webpack-vue3-jsx'} 应用程序`,
      value: 'webpack-vue3-jsx',
      pkgName: '@garron/webpack-vue3-jsx'
    },
    {
      name: `创建 ${'webpack-react17'} 应用程序`,
      value: 'webpack-react17',
      pkgName: '@garron/webpack-react17'
    }
  ],
  npm: [
    {
      name: `Create ${'NPM TypeScript Lib'} 模版`,
      value: 'npm-lib',
      pkgName: '@garron/npm-lib',
      choices: ['name', 'description']
    },
    {
      name: `Create ${'NPM Node package Lib'} 模版`,
      value: 'npm-package',
      pkgName: '@garron/npm-package',
      choices: ['name', 'description']
    }
  ]
};

export const askProjectChoice: askProjectChoiceType[] = [
  {
    type: 'input',
    name: 'name',
    message: '请输入项目名称:'
  },
  {
    type: 'input',
    name: 'description',
    message: '请输入项目描述'
  },
  {
    type: 'list',
    name: 'npm',
    message: '请选择安装依赖项的方式:',
    choices: [
      {
        name: 'npm',
        value: 'npm',
        checked: true
      },
      {
        name: 'yarn',
        value: 'yarn'
      },
      {
        name: 'pnpm',
        value: 'pnpm'
      }
    ]
  },
  {
    type: 'list',
    name: 'packages',
    message: '是否需要自动下载npm:',
    choices: [
      {
        name: 'no',
        value: 'no',
        checked: true
      },
      {
        name: 'yes',
        value: 'yes'
      }
    ]
  }
];

export const npmList: askProjectChoiceType = {
  type: 'list',
  name: 'npm',
  message: '请选择安装依赖项的方式:',
  choices: [
    {
      name: 'npm',
      value: 'npm',
      checked: true
    },
    {
      name: 'yarn',
      value: 'yarn'
    },
    {
      name: 'pnpm',
      value: 'pnpm'
    }
  ]
};

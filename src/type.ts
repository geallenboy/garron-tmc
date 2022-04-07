export interface askChoiceType {
  name:string;
  value:string;
  pkgName?:string;
  choices?:Array<string>
}

export interface proNameType {
  name:string;
  cmd:string;
}

export interface projectInfoAnswerType {
  name:string;
  description:string;
  npm:string;
}

export interface boilerplateAnswerType {
  boilerplateName:string
}

export interface choicesItemType {
  name:string;
  value:string;
  checked?:boolean
}

export interface askProjectChoiceType {
  type:string;
  name:string;
  message:string;
  choices?:choicesItemType[]
}

export interface projectType {
  project:string
}

export interface askDetailChoiceType {
  [key:string]:askChoiceType[]
}
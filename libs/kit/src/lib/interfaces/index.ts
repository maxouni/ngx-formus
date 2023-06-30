export type NgxRequiredType = true | false;

export interface NgxFormErrorMsgModel {
  errorRequiredMsg?: string;
  errorPatternMsg?: string;
  errorMinMsg?: string;
  errorMaxMsg?: string;
}

export interface NgxFormPattern {
  email: string | RegExp;
  numeric: string | RegExp;
  positiveNumeric: string | RegExp;
  percent: string | RegExp;
  words: string | RegExp;
}

export type NgxFormInputValue = string;
export type NgxFormInputType = 'text' | 'number' | 'search' | 'email' | 'password';

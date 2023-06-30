import { NgxFormPattern } from '../interfaces';

export const NGX_FORM_PATTERN: NgxFormPattern = {
  email: `[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?`,
  numeric: `^-?[0-9]\\d*(\\.\\d*)?$`,
  positiveNumeric: `^[0-9]\\d*(\\.\\d*)?$`,
  percent: `^100(\\.0{0,2})? *%?$|^\\d{1,2}(\\.\\d{1,2})? *%?$`,
  words: `[\\da-zA-Z\\-\\s"&._,+']*`,
};

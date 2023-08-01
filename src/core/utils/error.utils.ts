/* eslint-disable @typescript-eslint/no-unused-vars */
interface IErrorUtil {
  message: string;
  code?: string;
  error?: any;
  category?: string;
}

export class ErrorUtils {
  private messageObject: IErrorUtil;

  constructor(errorParam: string | IErrorUtil, category?: string) {
    if (typeof errorParam === 'string') {
      const splitStrMessage = errorParam.split('_');
      let code = '',
        message = '',
        error = undefined;
      if (splitStrMessage.length <= 1) {
        code = 'unkonw';
        message = errorParam;
        error = error;
      } else {
        code = splitStrMessage[0] || '';
        splitStrMessage.shift();
        message = splitStrMessage.length ? splitStrMessage.join('_') : 'unkonw';
      }
      this.messageObject = {
        message: message,
        code,
        error: message,
        category: category || 'normal',
      };
    } else {
      this.messageObject = errorParam;
    }
  }
  static _set(option, category) {
    return new ErrorUtils(option, category);
  }

  getError() {
    return this.messageObject;
  }
}

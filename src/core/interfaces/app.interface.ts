import { AppEnvironment } from './environment.interface';

export interface AppConfigModel {
  ENV: AppEnvironment;
  ROOT: string;
  IS_PRODUCTION: boolean;
  IS_LOCAL: boolean;
  IS_DEVELOP: boolean;
  IS_TESTING: boolean;
}

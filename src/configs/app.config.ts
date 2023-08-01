/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as path from 'path';

import { AppEnvironment, AppConfigModel } from '../core/interfaces';

let ENV: AppEnvironment;
const ROOT = path.normalize(__dirname + '/../..');

/**
 * @method setupEnv
 * @description config load environment
 * @return {AppEnvironment}
 */
function setupEnv(): AppEnvironment {
  return require('./env.config').default;
}
ENV = setupEnv();

export const APP_CONFIG = {
  ROOT: ROOT,
  ENV: ENV,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_LOCAL: process.env.NODE_ENV === 'local',
  IS_DEVELOP: process.env.NODE_ENV === 'develop',
  IS_TESTING: process.env.NODE_ENV === 'test',
} as AppConfigModel;

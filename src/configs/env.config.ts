import * as path from 'path';
import { AppEnvironment } from '../core/interfaces';
import * as dotenv from 'dotenv';

const ROOT = path.normalize(__dirname + '/../..');
dotenv.config({ path: `${ROOT}/.env` });

const envConfig: AppEnvironment = {
  NODE_ENV: process.env.NODE_ENV || 'local',
  VERSION: process.env.VERSION || 'v1',
  APP: {
    PORT: Number(process.env.APP_PORT) || 9999,
    NAME: process.env.APP_NAME || 'audit',
  },
  DATABASE: {
    POSTGRESQL: {
      USERNAME: process.env.POSTGRESQL_USERNAME || 'postgres',
      PASSWORD: process.env.POSTGRESQL_PASSWORD || 'postgres',
      HOST: process.env.POSTGRESQL_HOST || 'localhost',
      PORT: Number(process.env.POSTGRESQL_PORT) || 5432,
      NAME: process.env.POSTGRESQL_NAME || 'tru-mate-local',
    },
  },
  CLIENT_SECRET_KEY: process.env.SOJO_CLIENT_SECRET_KEY || 'client-secret-key',
  SECURE: {
    SECRET_KEY: process.env.SECURE_SECRET_KEY || 'hWmZq4t7w!z%C*F-JaNdRgUkXn2r5u8x',
    JWT: {
      JWT_SECRET: process.env.JWT_SECRET || 'core_apero-devjwtauthenticate-core.dev_professional#2023',
      EXPIRE: Number(process.env.JWT_EXPIRE) || 1000 * 60 * 60 * 24 * 30 * 9999, // 30 days x 9999
    },
  },
  LOGS: {
    PATH: {
      ERROR: process.env.LOGS_PATH_ERROR || './_data/logs/error/',
      SUCCESS: process.env.LOGS_PATH_SUCCESS || './_data/logs/success/',
    },
  },
  STORAGE: {
    DOMAIN: process.env.STORAGE_MEDIA_DOMAIN || 'https://uat-audit-media.sojohotels.com', // https://uat-audit-media.sojohotels.com http://localhost:9999/_data
    ROOT: path.join(__dirname, '../../', '_data/upload/storage'),
  },
  MAIL_CONFIG: {
    FROM: process.env.MAIL_CONFIG_SMTP_FROM || 'audit@tnteco.vn',
    SMTP_CONFIG: {
      service: process.env.MAIL_CONFIG_SMTP_SERVICE || '',
      host: process.env.MAIL_CONFIG_SMTP_HOST || 'email.tnginter.com',
      port: Number(process.env.MAIL_CONFIG_SMTP_PORT) || 587,
      auth: {
        user: process.env.MAIL_CONFIG_SMTP_USER || 'audit',
        pass: process.env.MAIL_CONFIG_SMTP_PASS || 'tntech@2023',
      },
    },
    WEB_URL: process.env.MAIL_CONFIG_SMTP_WEB_URL || 'https://email.tnginter.com/',
  },
};
export default envConfig;

import * as path from 'path';
import { AppEnvironment } from '../core/interfaces';
import * as dotenv from 'dotenv';

const ROOT = path.normalize(__dirname + '/../..');
dotenv.config({ path: `${ROOT}/.env` });

const envConfig: AppEnvironment = {
  NODE_ENV: process.env.NODE_ENV || 'local',
  VERSION: process.env.VERSION || 'v1',
  APP: {
    PORT: Number(process.env.APP_PORT) || 3000,
    NAME: process.env.APP_NAME || 'AI-serivce',
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
    DOMAIN: process.env.STORAGE_MEDIA_DOMAIN || '', //  http://localhost:9999/_data
    ROOT: path.join(__dirname, '../../', '_data/upload/storage'),
  },
  MAIL_CONFIG: {
    FROM: process.env.MAIL_CONFIG_SMTP_FROM || '',
    SMTP_CONFIG: {
      service: process.env.MAIL_CONFIG_SMTP_SERVICE || '',
      host: process.env.MAIL_CONFIG_SMTP_HOST || '',
      port: Number(process.env.MAIL_CONFIG_SMTP_PORT) || 587,
      auth: {
        user: process.env.MAIL_CONFIG_SMTP_USER || '',
        pass: process.env.MAIL_CONFIG_SMTP_PASS || '',
      },
    },
    WEB_URL: process.env.MAIL_CONFIG_SMTP_WEB_URL || '',
  },
  OPEN_AI: {
    API_KEY:
      process.env.OPEN_AI_API_KEY ||
      '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,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,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',
    MODEL: process.env.OPEN_AI_MODEL || 'gpt-3.5-turbo',
    ROLE: 'user',
  },
};
export default envConfig;

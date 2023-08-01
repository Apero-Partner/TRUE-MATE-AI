import { APP_CONFIG } from './app.config';
import * as path from 'path';
import { DataSourceOptions } from 'typeorm';
async function ormConfig(): Promise<DataSourceOptions> {
  const config = {
    SYNCHRONIZE: true,
    ENTITIES: [path.join(__dirname, '..') + '/core/entity/*.entity{.ts,.js}'],
    MIGRATIONS: [path.join(__dirname, '..') + '/core/migrations/**/*{.ts,.js}'],
    CLI: {
      migrationsDir: 'src/core/migrations',
    },
    MIGRATIONS_RUN: true,
  };

  const ormconfig: DataSourceOptions = {
    name: 'default',
    type: 'postgres',
    host: APP_CONFIG.ENV.DATABASE.POSTGRESQL.HOST,
    port: APP_CONFIG.ENV.DATABASE.POSTGRESQL.PORT,
    database: APP_CONFIG.ENV.DATABASE.POSTGRESQL.NAME,
    username: APP_CONFIG.ENV.DATABASE.POSTGRESQL.USERNAME,
    password: APP_CONFIG.ENV.DATABASE.POSTGRESQL.PASSWORD,
    logging: true, // log query trong sql
    synchronize: config.SYNCHRONIZE,
    entities: config.ENTITIES,
    migrations: config.MIGRATIONS,
    //cli: config.CLI,
    migrationsRun: config.MIGRATIONS_RUN,
  };
  return ormconfig;
}

export { ormConfig };

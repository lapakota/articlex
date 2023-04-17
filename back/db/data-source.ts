import { DataSource, DataSourceOptions } from 'typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE || dbConfig.type,
  host: process.env.POSTGRES_HOST || dbConfig.host,
  port: +process.env.POSTGRES_PORT || dbConfig.port,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.POSTGRES_DB || dbConfig.database,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/**/*.js'],
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

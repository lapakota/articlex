import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres-db',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'articlex',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/**/*.js'],
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

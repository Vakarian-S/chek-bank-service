
import {DataSource} from "typeorm";

export const typeOrmConfig = new DataSource({
  host: '/cloudsql/chek-app-352602:us-central1:chek-bank-service',
  type: 'postgres',
  port: 5432,
  username: 'postgres',
  password: process.env.DATABASE_PASSWORD || 's1=iVC;uo]Q+IY1&',
  database: 'chek-bank-service',
  synchronize: false,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrationsRun: false,
  migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
  extra: {
    // max connection pool (default: 10)
    max: parseInt(process.env.DATABASE_POOL, 10) || 15,
  },
})

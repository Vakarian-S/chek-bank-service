
import {DataSource} from "typeorm";

export const typeOrmConfig = new DataSource({

  type: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
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

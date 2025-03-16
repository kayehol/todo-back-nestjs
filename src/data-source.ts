import { DataSource } from 'typeorm';
import { dirname } from 'path';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [
    'src/entities/*.entity{.ts,.js}',
  ],
  migrations: [
    "src/migrations/*{.ts,.js}"
  ],
  synchronize: false,
  logging: true,
});

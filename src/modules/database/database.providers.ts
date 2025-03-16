import { DataSource } from "typeorm";

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        migrations: [
          __dirname + "../../migrations/*{.ts,.js}"
        ],
        synchronize: false,
        logging: true
      });

      return dataSource.initialize();
    },
  },
];

import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1742092971750 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE users (
                id int AUTO_INCREMENT NOT NULL, 
                username varchar(100) NOT NULL,
                password varchar(255) NOT NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id')
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE users");
    }
}

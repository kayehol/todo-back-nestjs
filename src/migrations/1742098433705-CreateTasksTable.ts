import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1742098433705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE tasks (
                id int AUTO_INCREMENT NOT NULL, 
                title varchar(100) NOT NULL,
                description varchar(255) NOT NULL,
                done boolean DEFAULT false,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                user_id int,
                PRIMARY KEY (id),
                CONSTRAINT FK_user_task
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE tasks");
    }

}

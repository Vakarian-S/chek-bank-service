import { MigrationInterface, QueryRunner } from "typeorm";

export class addBalance1654461200838 implements MigrationInterface {
    name = 'addBalance1654461200838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "balance" numeric NOT NULL DEFAULT '1000000'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "balance"`);
    }

}

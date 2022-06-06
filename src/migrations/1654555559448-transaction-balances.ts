import { MigrationInterface, QueryRunner } from "typeorm";

export class transactionBalances1654555559448 implements MigrationInterface {
    name = 'transactionBalances1654555559448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "senderBalance" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "recipientBalance" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "recipientBalance"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "senderBalance"`);
    }

}

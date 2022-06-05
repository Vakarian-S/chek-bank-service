import { MigrationInterface, QueryRunner } from "typeorm";

export class savedRecipientsCreate1654458132737 implements MigrationInterface {
    name = 'savedRecipientsCreate1654458132737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "saved_recipients" ("origin_account_id" uuid NOT NULL, "recipient_account_id" uuid NOT NULL, CONSTRAINT "PK_8c34a7b95356c04a16955cc1918" PRIMARY KEY ("origin_account_id", "recipient_account_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a24ce8649bdf2fd6cf5203dd01" ON "saved_recipients" ("origin_account_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ddee1b6ac82992b8d7fd634aa7" ON "saved_recipients" ("recipient_account_id") `);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_ee66d482ebdf84a768a7da36b08" UNIQUE ("accountNumber")`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "account_accountNumber_seq" OWNED BY "account"."accountNumber"`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "accountNumber" SET DEFAULT nextval('"account_accountNumber_seq"')`);
        await queryRunner.query(`ALTER TABLE "saved_recipients" ADD CONSTRAINT "FK_a24ce8649bdf2fd6cf5203dd01b" FOREIGN KEY ("origin_account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "saved_recipients" ADD CONSTRAINT "FK_ddee1b6ac82992b8d7fd634aa78" FOREIGN KEY ("recipient_account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saved_recipients" DROP CONSTRAINT "FK_ddee1b6ac82992b8d7fd634aa78"`);
        await queryRunner.query(`ALTER TABLE "saved_recipients" DROP CONSTRAINT "FK_a24ce8649bdf2fd6cf5203dd01b"`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "accountNumber" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "account_accountNumber_seq"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_ee66d482ebdf84a768a7da36b08"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ddee1b6ac82992b8d7fd634aa7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a24ce8649bdf2fd6cf5203dd01"`);
        await queryRunner.query(`DROP TABLE "saved_recipients"`);
    }

}

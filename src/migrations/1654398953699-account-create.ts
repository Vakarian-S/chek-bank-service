import { MigrationInterface, QueryRunner } from "typeorm";

export class accountCreate1654398953699 implements MigrationInterface {
    name = 'accountCreate1654398953699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."account_accounttype_enum" AS ENUM('cuenta-corriente', 'cuenta-vista', 'cuenta-ahorro')`);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "dni" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "bank" character varying NOT NULL, "accountType" "public"."account_accounttype_enum" NOT NULL, "accountNumber" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TYPE "public"."account_accounttype_enum"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class transactionCreate1654406800565 implements MigrationInterface {
    name = 'transactionCreate1654406800565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "senderId" uuid, "recipientId" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_ed3e32981d7a640be5480effecf" FOREIGN KEY ("senderId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_70bc33e4e93a3146119eb291a80" FOREIGN KEY ("recipientId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_70bc33e4e93a3146119eb291a80"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_ed3e32981d7a640be5480effecf"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}

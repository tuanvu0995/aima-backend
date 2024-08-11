import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723374217641 implements MigrationInterface {
  name = 'Migration1723374217641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "supplier" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "code" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "supplierId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4346e4adb741e80f3711ee09ba" ON "product" ("supplierId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_93b7af204032ffc8453f730398" ON "product" ("code", "deletedAt") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_99c39b067cfa73c783f0fc49a6" ON "product" ("code") `,
    );
    await queryRunner.query(
      `CREATE TABLE "sale" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "quantity" integer NOT NULL, "price" integer NOT NULL, "productId" integer, CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a0a99bbb3f0ae6ecea2abc7393" ON "sale" ("productId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD CONSTRAINT "FK_a0a99bbb3f0ae6ecea2abc7393b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sale" DROP CONSTRAINT "FK_a0a99bbb3f0ae6ecea2abc7393b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a0a99bbb3f0ae6ecea2abc7393"`,
    );
    await queryRunner.query(`DROP TABLE "sale"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_99c39b067cfa73c783f0fc49a6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_93b7af204032ffc8453f730398"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4346e4adb741e80f3711ee09ba"`,
    );
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "supplier"`);
  }
}

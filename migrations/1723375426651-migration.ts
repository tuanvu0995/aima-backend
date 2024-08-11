import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723375426651 implements MigrationInterface {
  name = 'Migration1723375426651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d35bdd3fde1c5b019ca00acf74"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7cfc24d6c24f0ec91294003d6b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" RENAME COLUMN "code" TO "sku"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b49dacc216c169978073c50eb3" ON "products" ("sku", "deletedAt") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c44ac33a05b144dd0d9ddcf932" ON "products" ("sku") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c44ac33a05b144dd0d9ddcf932"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b49dacc216c169978073c50eb3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" RENAME COLUMN "sku" TO "code"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_7cfc24d6c24f0ec91294003d6b" ON "products" ("code") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d35bdd3fde1c5b019ca00acf74" ON "products" ("deletedAt", "code") `,
    );
  }
}

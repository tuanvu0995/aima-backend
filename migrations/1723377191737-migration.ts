import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723377191737 implements MigrationInterface {
  name = 'Migration1723377191737';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "restockThreshold" integer NOT NULL DEFAULT '10'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "restockThreshold"`,
    );
  }
}

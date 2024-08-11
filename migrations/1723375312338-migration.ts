import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723375312338 implements MigrationInterface {
  name = 'Migration1723375312338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "sales" ADD "price" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "price" numeric(10,2) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "price" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "sales" ADD "price" integer NOT NULL`);
  }
}

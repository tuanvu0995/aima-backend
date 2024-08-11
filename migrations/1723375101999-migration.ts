import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723375101999 implements MigrationInterface {
  name = 'Migration1723375101999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sales" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "quantity" integer NOT NULL, "price" integer NOT NULL, "productId" integer, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58de77cc0543589490a33558b8" ON "sales" ("productId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "suppliers" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "code" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "supplierId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c143cbc0299e1f9220c4b5debd" ON "products" ("supplierId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d35bdd3fde1c5b019ca00acf74" ON "products" ("code", "deletedAt") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_7cfc24d6c24f0ec91294003d6b" ON "products" ("code") `,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ADD CONSTRAINT "FK_58de77cc0543589490a33558b8e" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_c143cbc0299e1f9220c4b5debd8" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_c143cbc0299e1f9220c4b5debd8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" DROP CONSTRAINT "FK_58de77cc0543589490a33558b8e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7cfc24d6c24f0ec91294003d6b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d35bdd3fde1c5b019ca00acf74"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c143cbc0299e1f9220c4b5debd"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "suppliers"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58de77cc0543589490a33558b8"`,
    );
    await queryRunner.query(`DROP TABLE "sales"`);
  }
}

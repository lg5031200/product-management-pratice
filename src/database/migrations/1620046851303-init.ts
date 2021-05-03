import {MigrationInterface, QueryRunner} from "typeorm";

export class init1620046851303 implements MigrationInterface {
    name = 'init1620046851303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "signature" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "productId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_9f16dbbf263b0af0f03637fa7b5" UNIQUE ("title"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_categories_category" ("productId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_17f2a361443184000ee8d79f240" PRIMARY KEY ("productId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_342d06dd0583aafc156e076379" ON "product_categories_category" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_15520e638eb4c46c4fb2c61c4b" ON "product_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_1e9f24a68bd2dcd6390a4008395" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_342d06dd0583aafc156e0763790" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4"`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_342d06dd0583aafc156e0763790"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_1e9f24a68bd2dcd6390a4008395"`);
        await queryRunner.query(`DROP INDEX "IDX_15520e638eb4c46c4fb2c61c4b"`);
        await queryRunner.query(`DROP INDEX "IDX_342d06dd0583aafc156e076379"`);
        await queryRunner.query(`DROP TABLE "product_categories_category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}

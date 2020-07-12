import {MigrationInterface, QueryRunner} from "typeorm";

export class creatTables1594521006364 implements MigrationInterface {
    name = 'creatTables1594521006364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "content" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(200) NOT NULL, "linkContent" character varying NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "lessonId" uuid, CONSTRAINT "REL_0b349f6b8ca7f05eed39ffb956" UNIQUE ("lessonId"), CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lesson" ("description" character varying(150) NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "classeId" uuid, "identificationId" uuid NOT NULL DEFAULT uuid_generate_v4(), "identificationName" character varying NOT NULL, "identificationCnpj" character varying NOT NULL, "identificationCreated_at" TIMESTAMP NOT NULL DEFAULT now(), "identificationUpdated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1ce51714f6080ab75a1f04f4a5b" PRIMARY KEY ("identificationId"))`);
        await queryRunner.query(`CREATE TABLE "class" ("duration" integer NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "identificationId" uuid NOT NULL DEFAULT uuid_generate_v4(), "identificationName" character varying NOT NULL, "identificationCnpj" character varying NOT NULL, "identificationCreated_at" TIMESTAMP NOT NULL DEFAULT now(), "identificationUpdated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_57fa912a9d5d09687434754bea0" PRIMARY KEY ("identificationId"))`);
        await queryRunner.query(`CREATE TABLE "college" ("graduations" character varying NOT NULL, "year" integer NOT NULL, "toDeleteColumn" integer NOT NULL, "identificationId" uuid NOT NULL DEFAULT uuid_generate_v4(), "identificationName" character varying NOT NULL, "identificationCnpj" character varying NOT NULL, "identificationCreated_at" TIMESTAMP NOT NULL DEFAULT now(), "identificationUpdated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ea02cccb5b3a75968ef94483fcf" PRIMARY KEY ("identificationId"))`);
        await queryRunner.query(`CREATE TABLE "student" ("key" integer NOT NULL, "email" character varying NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "identificationId" uuid NOT NULL DEFAULT uuid_generate_v4(), "identificationName" character varying NOT NULL, "identificationCnpj" character varying NOT NULL, "identificationCreated_at" TIMESTAMP NOT NULL DEFAULT now(), "identificationUpdated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_006ea9ee9bde26c8396b92e9ab8" PRIMARY KEY ("identificationId"))`);
        await queryRunner.query(`CREATE TABLE "university" ("graduations" character varying NOT NULL, "doctors" character varying NOT NULL, "masters" character varying NOT NULL, "identificationId" uuid NOT NULL DEFAULT uuid_generate_v4(), "identificationName" character varying NOT NULL, "identificationCnpj" character varying NOT NULL, "identificationCreated_at" TIMESTAMP NOT NULL DEFAULT now(), "identificationUpdated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d6c034b996fecea5836da42dc44" PRIMARY KEY ("identificationId"))`);
        await queryRunner.query(`CREATE TABLE "student_classes_class" ("studentIdentificationId" uuid NOT NULL, "classIdentificationId" uuid NOT NULL, CONSTRAINT "PK_e03580c96cdbdb2ec82f4f52079" PRIMARY KEY ("studentIdentificationId", "classIdentificationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ffc23581c05e461a5113b950ac" ON "student_classes_class" ("studentIdentificationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cebdba54d374dfefbf1b53e0f4" ON "student_classes_class" ("classIdentificationId") `);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "FK_0b349f6b8ca7f05eed39ffb956d" FOREIGN KEY ("lessonId") REFERENCES "lesson"("identificationId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_f8129e3c7eacda851f01f054f96" FOREIGN KEY ("classeId") REFERENCES "class"("identificationId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD CONSTRAINT "FK_ffc23581c05e461a5113b950ac4" FOREIGN KEY ("studentIdentificationId") REFERENCES "student"("identificationId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD CONSTRAINT "FK_cebdba54d374dfefbf1b53e0f48" FOREIGN KEY ("classIdentificationId") REFERENCES "class"("identificationId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP CONSTRAINT "FK_cebdba54d374dfefbf1b53e0f48"`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP CONSTRAINT "FK_ffc23581c05e461a5113b950ac4"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_f8129e3c7eacda851f01f054f96"`);
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "FK_0b349f6b8ca7f05eed39ffb956d"`);
        await queryRunner.query(`DROP INDEX "IDX_cebdba54d374dfefbf1b53e0f4"`);
        await queryRunner.query(`DROP INDEX "IDX_ffc23581c05e461a5113b950ac"`);
        await queryRunner.query(`DROP TABLE "student_classes_class"`);
        await queryRunner.query(`DROP TABLE "university"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "college"`);
        await queryRunner.query(`DROP TABLE "class"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
        await queryRunner.query(`DROP TABLE "content"`);
    }

}

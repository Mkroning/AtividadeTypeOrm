import {MigrationInterface, QueryRunner} from "typeorm";

export class creatTables1594427061368 implements MigrationInterface {
    name = 'creatTables1594427061368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP CONSTRAINT "FK_4e224193a4e2c8e1b28afa74e9d"`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP CONSTRAINT "FK_3d4b9aa106e0113abd39f061827"`);
        await queryRunner.query(`DROP INDEX "IDX_4e224193a4e2c8e1b28afa74e9"`);
        await queryRunner.query(`DROP INDEX "IDX_3d4b9aa106e0113abd39f06182"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "PK_0ef25918f0237e68696dee455bd"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "UQ_574dd394846fb85d495d0f77dfd"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "PK_3d8016e1cb58429474a3c041904"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP CONSTRAINT "PK_9f2c655a5feb7cff342af016c8e"`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD CONSTRAINT "PK_3d4b9aa106e0113abd39f061827" PRIMARY KEY ("classId")`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP COLUMN "studentId"`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP CONSTRAINT "PK_3d4b9aa106e0113abd39f061827"`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP COLUMN "classId"`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD "identificationId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "PK_1ce51714f6080ab75a1f04f4a5b" PRIMARY KEY ("identificationId")`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD "identificationName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD "identificationCnpj" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD "identificationCreated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD "identificationUpdated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "class" ADD "identificationId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "PK_57fa912a9d5d09687434754bea0" PRIMARY KEY ("identificationId")`);
        await queryRunner.query(`ALTER TABLE "class" ADD "identificationName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "class" ADD "identificationCnpj" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "class" ADD "identificationCreated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "class" ADD "identificationUpdated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "student" ADD "identificationId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "PK_006ea9ee9bde26c8396b92e9ab8" PRIMARY KEY ("identificationId")`);
        await queryRunner.query(`ALTER TABLE "student" ADD "identificationName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD "identificationCnpj" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD "identificationCreated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "student" ADD "identificationUpdated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD "studentIdentificationId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD CONSTRAINT "PK_ffc23581c05e461a5113b950ac4" PRIMARY KEY ("studentIdentificationId")`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD "classIdentificationId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP CONSTRAINT "PK_ffc23581c05e461a5113b950ac4"`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD CONSTRAINT "PK_e03580c96cdbdb2ec82f4f52079" PRIMARY KEY ("studentIdentificationId", "classIdentificationId")`);
        await queryRunner.query(`CREATE INDEX "IDX_ffc23581c05e461a5113b950ac" ON "student_classes_class" ("studentIdentificationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cebdba54d374dfefbf1b53e0f4" ON "student_classes_class" ("classIdentificationId") `);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD CONSTRAINT "FK_ffc23581c05e461a5113b950ac4" FOREIGN KEY ("studentIdentificationId") REFERENCES "student"("identificationId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD CONSTRAINT "FK_cebdba54d374dfefbf1b53e0f48" FOREIGN KEY ("classIdentificationId") REFERENCES "class"("identificationId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP CONSTRAINT "FK_cebdba54d374dfefbf1b53e0f48"`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP CONSTRAINT "FK_ffc23581c05e461a5113b950ac4"`);
        await queryRunner.query(`DROP INDEX "IDX_cebdba54d374dfefbf1b53e0f4"`);
        await queryRunner.query(`DROP INDEX "IDX_ffc23581c05e461a5113b950ac"`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP CONSTRAINT "PK_e03580c96cdbdb2ec82f4f52079"`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD CONSTRAINT "PK_ffc23581c05e461a5113b950ac4" PRIMARY KEY ("studentIdentificationId")`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP COLUMN "classIdentificationId"`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP CONSTRAINT "PK_ffc23581c05e461a5113b950ac4"`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP COLUMN "studentIdentificationId"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "identificationUpdated_at"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "identificationCreated_at"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "identificationCnpj"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "identificationName"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "PK_006ea9ee9bde26c8396b92e9ab8"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "identificationId"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "identificationUpdated_at"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "identificationCreated_at"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "identificationCnpj"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "identificationName"`);
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "PK_57fa912a9d5d09687434754bea0"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "identificationId"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "identificationUpdated_at"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "identificationCreated_at"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "identificationCnpj"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "identificationName"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "PK_1ce51714f6080ab75a1f04f4a5b"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "identificationId"`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD "classId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD CONSTRAINT "PK_3d4b9aa106e0113abd39f061827" PRIMARY KEY ("classId")`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD "studentId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" DROP CONSTRAINT "PK_3d4b9aa106e0113abd39f061827"`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD CONSTRAINT "PK_9f2c655a5feb7cff342af016c8e" PRIMARY KEY ("studentId", "classId")`);
        await queryRunner.query(`ALTER TABLE "student" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "class" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "UQ_574dd394846fb85d495d0f77dfd" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "class" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id")`);
        await queryRunner.query(`CREATE INDEX "IDX_3d4b9aa106e0113abd39f06182" ON "student_classes_class" ("classId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4e224193a4e2c8e1b28afa74e9" ON "student_classes_class" ("studentId") `);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD CONSTRAINT "FK_3d4b9aa106e0113abd39f061827" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_classes_class" ADD CONSTRAINT "FK_4e224193a4e2c8e1b28afa74e9d" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

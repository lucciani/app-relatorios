import { MigrationInterface, QueryRunner } from "typeorm";

export class Omie1648756055589 implements MigrationInterface {
  private schemaName = "omie";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema(this.schemaName, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema(this.schemaName, true);
  }
}

import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class AdicionarIndexTag1650903562836 implements MigrationInterface {
  private tableName = "omie.tag";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: "fk_TAG_COD_TAG1",
        columnNames: ["ncodtag"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(this.tableName, "fk_TAG_COD_TAG1");
  }
}

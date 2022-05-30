import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompanyTokens1649446764345 implements MigrationInterface {
  private tableName = "omie.empresa_token";
  private tableNameCompany = "omie.empresa";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "id_empresa",
            type: "serial4",
            isPrimary: true,
          },
          {
            name: "app_key",
            type: "varchar",
            length: "100",
          },
          {
            name: "app_secret",
            type: "varchar",
            length: "100",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_token_company",
            referencedTableName: this.tableNameCompany,
            referencedColumnNames: ["id"],
            columnNames: ["id_empresa"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, "FK_token_company");
    await queryRunner.dropTable(this.tableName, true);
  }
}

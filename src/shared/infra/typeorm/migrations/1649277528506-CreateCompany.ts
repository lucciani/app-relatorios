import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompany1649277528506 implements MigrationInterface {
  private tableName = "omie.empresa";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "id",
            type: "int",
            length: "11",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "razao_social",
            type: "varchar",
            length: "60",
            isNullable: false,
          },
          {
            name: "nome_fantasia",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "cnpj",
            type: "varchar",
            length: "14",
            isNullable: false,
          },
          {
            name: "ie",
            type: "varchar",
            length: "14",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "ativo",
            type: "boolean",
            default: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true);
  }
}

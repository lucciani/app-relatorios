import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarTagClienteFornecedor1649957398658
  implements MigrationInterface
{
  private tableName = "omie.tag_cliente_fornecedor";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "codigo_cliente_omie",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "id_empresa",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "ncodtag",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        indices: [
          {
            name: "fk_TAG_CLIENTE_FORNECEDOR_CLIENTE_FORNECEDOR1",
            columnNames: ["codigo_cliente_omie", "id_empresa"],
          },
          {
            name: "fk_TAG_CLIENTE_FORNECEDOR_TAG1",
            columnNames: ["ncodtag"],
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

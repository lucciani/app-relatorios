import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarCaracteristicaClienteFornecedor1649957720423
  implements MigrationInterface
{
  private tableName = "omie.caracteristica_cliente_fornecedor";
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
            name: "campo",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "conteudo",
            type: "varchar",
            isNullable: true,
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
            name: "fk_CARACTERISTICAS_CLIENTE_FORNECEDOR_CLIENTE_FORNECEDOR1",
            columnNames: ["codigo_cliente_omie", "id_empresa"],
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

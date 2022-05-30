import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarParcelaPedidoCompra1650417015595
  implements MigrationInterface
{
  private tableName = "omie.parcela_pedido_compra";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "ncodped",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "nparcela",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "id_empresa",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "dvencto",
            type: "date",
            isNullable: true,
          },
          {
            name: "nvalor",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "ndias",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "npercent",
            type: "decimal",
            precision: 29,
            scale: 2,
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
            name: "fk_PARCELA_PEDIDO_COMPRA_PEDIDO_COMPRA1",
            columnNames: ["ncodped", "id_empresa"],
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

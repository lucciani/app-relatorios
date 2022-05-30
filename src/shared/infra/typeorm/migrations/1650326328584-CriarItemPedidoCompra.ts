import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarItemPedidoCompra1650326328584 implements MigrationInterface {
  private tableName = "omie.item_pedido_compra";
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          // {
          //   name: "id",
          //   type: "uuid",
          //   isPrimary: true,
          // },
          {
            name: "ncodped",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "id_empresa",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "ccodintitem",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ncoditem",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "ccodintprod",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ncodprod",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "cproduto",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cdescricao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cncm",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cean",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cunidade",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "npesoliq",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "npesobruto",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nqtde",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nvalunit",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nvalmerc",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "ndesconto",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nvaloricms",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nvalorst",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nvaloripi",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nvalorpis",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "ndespesas",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nvalorcofins",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nfrete",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nseguro",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nvaltot",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "cobs",
            type: "text",
            isNullable: true,
          },
          {
            name: "cmkpatupv",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cmkpatusm",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nmkpperc",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "codigo_local_estoque",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "ccodcateg",
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
            name: "fk_ITEM_PEDIDO_COMPRA_PRODUTO_SERVICO1",
            columnNames: ["ncodprod"],
          },
          {
            name: "fk_ITEM_PEDIDO_COMPRA_PEDIDO_COMPRA1",
            columnNames: ["id_empresa", "ncodped"],
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

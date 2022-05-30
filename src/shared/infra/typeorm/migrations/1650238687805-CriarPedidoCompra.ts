import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarPedidoCompra1650238687805 implements MigrationInterface {
  private tableName = "omie.pedido_compra";
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
            name: "id_empresa",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "ccodintped",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "dincdata",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "cnumero",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ddtprevisao",
            type: "date",
            isNullable: true,
          },
          {
            name: "ccodparc",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nqtdeparc",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "ncodfor",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "ccodintfor",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ccodcateg",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ncodcompr",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "ccontato",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ncodcc",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "ncodintcc",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ncodproj",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "cnumpedido",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cetapa",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cobs",
            type: "text",
            isNullable: true,
          },
          {
            name: "cobsint",
            type: "text",
            isNullable: true,
          },
          {
            name: "frete_ncodtransp",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "frete_ccodinttransp",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "frete_ctpfrete",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "frete_cplaca",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "frete_cuf",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "frete_nqtdvol",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "frete_cespvol",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "frete_cmarvol",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "frete_cnumvol",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "frete_npesoliq",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "frete_npesobruto",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "frete_nvalfrete",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "frete_nvalseguro",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "frete_clacre",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "frete_valoutras",
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
            name: "fk_PEDIDO_COMPRA_PARCELAS1",
            columnNames: ["ccodparc"],
          },
          {
            name: "fk_PEDIDO_COMPRA_EMPRESA1",
            columnNames: ["id_empresa"],
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

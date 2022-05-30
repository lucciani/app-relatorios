import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarPedidoCompraDepartamento1650456849710
  implements MigrationInterface
{
  private tableName = "omie.pedido_compra_departamento";
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
            name: "ccoddepto",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "nperc",
            type: "decimal",
            precision: 29,
            scale: 2,
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
            name: "fk_PEDIDO_COMPRA_has_DEPARTAMENTO_DEPARTAMENTO1",
            columnNames: ["ccoddepto"],
          },
          {
            name: "fk_PEDIDO_COMPRA_has_DEPARTAMENTO_PEDIDO_COMPRA1",
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

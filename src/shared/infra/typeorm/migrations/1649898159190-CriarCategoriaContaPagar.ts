import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarCategoriaContaPagar1649898159190
  implements MigrationInterface
{
  private tableName = "omie.categoria_conta_pagar";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "codigo_lancamento_omie",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "codigo_categoria",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "id_empresa",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "valor",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "percentual",
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
            name: "fk_CONTA_PAGAR_CATEGORIA_CATEGORIA1",
            columnNames: ["codigo_categoria"],
          },
          {
            name: "fk_CONTA_PAGAR_CATEGORIA_CONTA_PAGAR1",
            columnNames: ["codigo_lancamento_omie", "id_empresa"],
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

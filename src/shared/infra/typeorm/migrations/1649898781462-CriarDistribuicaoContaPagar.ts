import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarDistribuicaoContaPagar1649898781462
  implements MigrationInterface
{
  private tableName = "omie.distribuicao_conta_pagar";
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
            name: "ccoddep",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "cdesdep",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nvaldep",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nperdep",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "id_empresa",
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
            name: "fk_CONTA_PAGAR_DEPARTAMENTO_DEPARTAMENTO1",
            columnNames: ["ccoddep"],
          },
          {
            name: "fk_CONTA_PAGAR_DEPARTAMENTO_CONTA_PAGAR1",
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

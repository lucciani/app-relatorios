import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarMovimentoFinanceiroDepartamento1650659934063
  implements MigrationInterface
{
  private tableName = "omie.movimento_financeiro_departamento";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "ncodtitulo",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "id_empresa",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "codigo",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "ndistrpercentual",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "ndistrvalor",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nvalorfixo",
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
            name: "fk_MOVIMENTO_FINANCEIRO_has_DEPARTAMENTO_DEPARTAMENTO1",
            columnNames: ["codigo"],
          },
          {
            name: "fk_MOVIMENTO_FINANCEIRO_has_DEPARTAMENTO_MOVIMENTO_FINANCEIRO1",
            columnNames: ["ncodtitulo", "id_empresa"],
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

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarMovimentoFinanceiroCategoria1650663062728
  implements MigrationInterface
{
  private tableName = "omie.movimento_financeiro_categoria";
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
            name: "fk_MOVIMENTO_FINANCEIRO_has_CATEGORIA_CATEGORIA1",
            columnNames: ["codigo"],
          },
          {
            name: "fk_MOVIMENTO_FINANCEIRO_has_CATEGORIA_MOVIMENTO_FINANCEIRO1",
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

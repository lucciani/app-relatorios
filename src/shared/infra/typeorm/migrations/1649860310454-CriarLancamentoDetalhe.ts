import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarLancamentoDetalhe1649860310454 implements MigrationInterface {
  private tableName = "omie.lancamento_detalhe";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "codigo_lancamento",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "ncodint",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "coo",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ccf",
            type: "varchar",
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
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true);
  }
}

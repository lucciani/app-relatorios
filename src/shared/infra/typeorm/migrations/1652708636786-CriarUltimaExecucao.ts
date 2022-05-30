import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarUltimaExecucao1652708636786 implements MigrationInterface {
  private tableName = "omie.ultima_execucao";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "id_empresa",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "nome_api",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "objeto",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "data",
            type: "timestamp",
            isNullable: true,
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

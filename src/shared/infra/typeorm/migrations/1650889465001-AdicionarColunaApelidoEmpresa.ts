import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AdicionarColunaApelidoEmpresa1650889465001
  implements MigrationInterface
{
  private tableName = "omie.empresa";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: "apelido",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, "apelido");
  }
}

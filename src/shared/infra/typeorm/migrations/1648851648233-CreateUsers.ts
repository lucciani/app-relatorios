import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1648851648233 implements MigrationInterface {
  // private tableName = "omie.users";
  private tableName = "omie.usuario";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
          },
          {
            name: "is_admin",
            type: "boolean",
            default: false,
          },
          {
            name: "avatar",
            type: "varchar",
            isNullable: true,
            length: "255",
          },
          {
            name: "created_at",
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

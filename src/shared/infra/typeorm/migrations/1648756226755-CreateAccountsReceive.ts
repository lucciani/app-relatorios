import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAccountsReceive1648756226755 implements MigrationInterface {
  private tableName = "omie.conta_receber";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "codigo_lancamento_omie",
            type: "bigint",
            width: 20,
            isPrimary: true,
          },
          {
            name: "id_empresa",
            type: "bigint",
            isNullable: true,
            isPrimary: true,
          },
          {
            name: "codigo_cliente_fornecedor",
            type: "bigint",
            width: 20,
            isNullable: true,
            isPrimary: true,
          },
          {
            name: "codigo_lancamento_integracao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "codigo_cliente_fornecedor_integracao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "data_vencimento",
            type: "date",
            isNullable: true,
          },
          {
            name: "valor_documento",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "codigo_categoria",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "data_previsao",
            type: "date",
            isNullable: true,
          },
          {
            name: "id_conta_corrente",
            type: "bigint",
            width: 20,
            isNullable: true,
          },
          {
            name: "numero_documento",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "id_origem",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "numero_parcela",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "codigo_tipo_documento",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "numero_documento_fiscal",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "numero_pedido",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "chave_nfe",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "observacao",
            type: "text",
            isNullable: true,
          },
          {
            name: "codigo_barras_ficha_compensacao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "codigo_cmc7_cheque",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "data_emissao",
            type: "date",
            isNullable: true,
          },
          {
            name: "operacao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "valor_pis",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "retem_pis",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "valor_cofins",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "retem_cofins",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "valor_csll",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "retem_csll",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "valor_ir",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "retem_ir",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "valor_iss",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "retem_iss",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "valor_inss",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "retem_inss",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "bloqueado",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "bloquear_baixa",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "importado_api",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "baixar_documento",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "conciliar_documento",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "acao",
            type: "text",
            isNullable: true,
          },
          {
            name: "status_titulo",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "codigo_vendedor",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "codigo_projeto",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "nsu",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "data_registro",
            type: "date",
            isNullable: true,
          },
          {
            name: "tipo_agrupamento",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "info_data_inclusao",
            type: "timestamp(0)",
            isNullable: true,
          },
          {
            name: "info_usuario_inclusao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "info_data_alteracao",
            type: "timestamp(0)",
            isNullable: true,
          },
          {
            name: "info_usuario_alteracao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "info_importado_api",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cgerado",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ddtembol",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cnumboleto",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cnumbancario",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nperjuros",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "npermulta",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "ncodpedido",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "bloquear_exclusao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ncodos",
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
            name: "fk_CONTA_RECEBER_EMPRESAS1",
            columnNames: ["id_empresa"],
          },
          {
            name: "fk_CONTA_RECEBER_CLIENTE_FORNECEDOR1",
            columnNames: ["codigo_cliente_fornecedor"],
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

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarContaPagar1649896314321 implements MigrationInterface {
  private tableName = "omie.conta_pagar";
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
            name: "id_empresa",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "codigo_cliente_fornecedor",
            type: "bigint",
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
            isNullable: true,
          },
          {
            name: "numero_documento_fiscal",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "data_emissao",
            type: "date",
            isNullable: true,
          },
          {
            name: "data_entrada",
            type: "date",
            isNullable: true,
          },
          {
            name: "codigo_projeto",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "observacao",
            type: "text",
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
            name: "numero_pedido",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "codigo_tipo_documento",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "numero_documento",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "numero_parcela",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "chave_nfe",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "codigo_barras_ficha_compensacao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "codigo_vendedor",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "id_origem",
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
            name: "operacao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "status_titulo",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nsu",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "acao",
            type: "text",
            isNullable: true,
          },
          {
            name: "id_conta_corrente_integracao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "bloqueado",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "baixa_bloqueada",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "codigo_cmc7_cheque",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "importado_api",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "bloquear_exclusao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "codigo_forma_pagamento",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "banco_transferencia",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "agencia_transferencia",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "conta_corrente_transferencia",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "finalidade_transferencia",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cpf_cnpj_transferencia",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nome_transferencia",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "codigo_barras_boleto",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "juros_boleto",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "multa_boleto",
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
            name: "fk_CONTA_PAGAR_EMPRESA1",
            columnNames: ["id_empresa"],
          },
          {
            name: "fk_CONTA_PAGAR_CLIENTE_FORNECEDOR1",
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

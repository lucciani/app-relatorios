import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarClienteFornecedor1649948442667 implements MigrationInterface {
  private tableName = "omie.cliente_fornecedor";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "codigo_cliente_omie",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "id_empresa",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "codigo_cliente_integracao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "razao_social",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cnpj_cpf",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nome_fantasia",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "telefone1_ddd",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "telefone1_numero",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "contato",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "endereco",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "endereco_numero",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "bairro",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "complemento",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "estado",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cidade",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cep",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "codigo_pais",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "separar_endereco",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "telefone2_ddd",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "telefone2_numero",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "fax_ddd",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "fax_numero",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "homepage",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "inscricao_estadual",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "inscricao_municipal",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "inscricao_suframa",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "optante_simples_nacional",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "tipo_atividade",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cnae",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "produtor_rural",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "contribuinte",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "observacao",
            type: "text",
            isNullable: true,
          },
          {
            name: "obs_detalhadas",
            type: "text",
            isNullable: true,
          },
          {
            name: "recomendacao_atraso",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "pessoa_fisica",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "exterior",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "logradouro",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "importado_api",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "bloqueado",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cidade_ibge",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "valor_limite_credito",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "bloquear_faturamento",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "recomendacoes_numero_parcelas",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "recomendacoes_codigo_vendedor",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "recomnedacoes_email_fatura",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "recomendacoes_gerar_boletos",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "recomendacoes_codigo_transportadora",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "enderentrega_entrazaosocial",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "enderentrega_entcnpjcpf",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "enderentrega_entendereco",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "enderentrega_entnumero",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "enderentrega_entcomplemento",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "enderentrega_entbairro",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "enderentrega_entcep",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "enderentrega_entestado",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "enderentrega_entcidade",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "enderentrega_entsepararendereco",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "enderentrega_enttelefone",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "enderentrega_entie",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nif",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "documento_exterior",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "inativo",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "dadosbancarios_codigo_banco",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "dadosbancarios_agencia",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "dadosbancarios_conta_corrente",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "dadosbancarios_doc_titular",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "dadosbancarios_nome_titular",
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
            name: "bloquear_exclusao",
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
            name: "fk_CLIENTE_FORNECEDOR_EMPRESAS1",
            columnNames: ["id_empresa"],
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

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarProduto1650484947323 implements MigrationInterface {
  private tableName = "omie.produto";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "codigo_produto",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "id_empresa",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "codigo_produto_integracao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "descricao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "codigo",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "unidade",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ncm",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ean",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "valor_unitario",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "codigo_familia",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "tipoitem",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "origem_mercadoria",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "id_preco_tabelado",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "id_cest",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cupom_fiscal",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "market_place",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "indicador_escala",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cnpj_fabricante",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "peso_liq",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "peso_bruto",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "altura",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "largura",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "profundidade",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "marca",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "modelo",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "dias_garantia",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "dias_crossdocking",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "descr_detalhada",
            type: "text",
            isNullable: true,
          },
          {
            name: "obs_internas",
            type: "text",
            isNullable: true,
          },
          {
            name: "info_dinc",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "info_uinc",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "info_dalt",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "info_ualt",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cimpapi",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "exibir_descricao_nfe",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "exibir_descricao_pedido",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cst_icms",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "modalidade_icms",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "csosn_icms",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "aliquota_icms",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "red_base_icms",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "motivo_deson_icms",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "per_icms_fcp",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "codigo_beneficio",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cst_pis",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "aliquota_pis",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "cst_cofins",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "aliquota_cofins",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "cfop",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "dadosibpt_aliqfederal",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "dadosibpt_aliqestadual",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "dadosibpt_aliqmunicipal",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "dadosibpt_fonte",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "dadosibpt_chave",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "dadosibpt_versao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "dadosibpt_valido_de",
            type: "date",
            isNullable: true,
          },
          {
            name: "dadosibpt_valido_ate",
            type: "date",
            isNullable: true,
          },
          {
            name: "codint_familia",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "descricao_familia",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "bloqueado",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "bloquear_exclusao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "importado_api",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "inativo",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "lead_time",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "aliquota_ibpt",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "cest",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "quantidade_estoque",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "estoque_minimo",
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
            name: "fk_PRODUTO_EMPRESAS1",
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

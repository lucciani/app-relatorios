import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarMovimentoFinanceiro1650548668938
  implements MigrationInterface
{
  private tableName = "omie.movimento_financeiro";
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
            name: "ncodcliente",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "corigem",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cgrupo",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ccodprojeto",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "ccodinttitulo",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cnumtitulo",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ddtemissao",
            type: "date",
            isNullable: true,
          },
          {
            name: "ddtvenc",
            type: "date",
            isNullable: true,
          },
          {
            name: "ddtprevisao",
            type: "date",
            isNullable: true,
          },
          {
            name: "ddtpagamento",
            type: "date",
            isNullable: true,
          },
          {
            name: "ccpfcnpjcliente",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ncodctr",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "cnumctr",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ncodos",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "cnumos",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ncodcc",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "cstatus",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cnatureza",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ctipo",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "coperacao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cnumdocfiscal",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ccodcateg",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cnumparcela",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nvalortitulo",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nvalorpis",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "cretpis",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nvalorcofins",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "cretcofins",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nvalorcsll",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "cretcsll",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nvalorir",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "cretir",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nvaloriss",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "cretiss",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nvalorinss",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "cretinss",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "observacao",
            type: "text",
            isNullable: true,
          },
          {
            name: "ccodvendedor",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "ncodcomprador",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "ccodigobarras",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cnsu",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ncodnf",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "ddtregistro",
            type: "date",
            isNullable: true,
          },
          {
            name: "cnumboleto",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cchavenfe",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ncodtitrepet",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "ncodmovcc",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "nvalormovcc",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "ncodmovccrepet",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "ndesconto",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "njuros",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "nmulta",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "ncodbaixa",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "ddtcredito",
            type: "date",
            isNullable: true,
          },
          {
            name: "ddtconcilia",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "cusconcilia",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ddtinc",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "cusinc",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ddtalt",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "cusalt",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "resumo_cliquidado",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "resumo_nvalpago",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "resumo_nvalaberto",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "resumo_ndesconto",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "resumo_njuros",
            type: "decimal",
            precision: 29,
            scale: 2,
            isNullable: true,
          },
          {
            name: "resumo_nmulta",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "resumo_nvalliquido",
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
            name: "fk_MOVIMENTO_FINANCEIRO_EMPRESA1",
            columnNames: ["id_empresa"],
          },
          {
            name: "fk_MOVIMENTO_FINANCEIRO_GRUPO",
            columnNames: ["cgrupo"],
          },
          {
            name: "fk_MOVIMENTO_FINANCEIRO_ORIGEM",
            columnNames: ["corigem"],
          },
          {
            name: "fk_MOVIMENTO_FINANCEIRO_CLIENTE_FORNECEDOR1",
            columnNames: ["ncodcliente"],
          },
          {
            name: "fk_MOVIMENTO_FINANCEIRO_CODIGO_TITULO1",
            columnNames: ["ncodtitulo"],
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

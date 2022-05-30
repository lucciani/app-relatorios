import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class CriarIndices1652360096601 implements MigrationInterface {
  private tableCaracteristicaClienteFornecedor =
    "omie.caracteristica_cliente_fornecedor";
  private tableCategoriaContaPagar = "omie.categoria_conta_pagar";
  private tableCategoriaContaReceber = "omie.categoria_conta_receber";
  private tableClienteFornecedor = "omie.cliente_fornecedor";
  private tableContaPagar = "omie.conta_pagar";
  private tableContaReceber = "omie.conta_receber";
  private tableDistribuicaoContaPagar = "omie.distribuicao_conta_pagar";
  private tableDistribuicaoContaReceber = "omie.distribuicao_conta_receber";
  private tableEmpresa = "omie.empresa";
  private tableItemPedidoCompra = "omie.item_pedido_compra";
  private tableLancamentoDetalhe = "omie.lancamento_detalhe";
  private tableMovimentoFinanceiro = "omie.movimento_financeiro";
  private tableMovimentoFinanceiroCategoria =
    "omie.movimento_financeiro_categoria";
  private tableMovimentoFinanceiroDepartamento =
    "omie.movimento_financeiro_departamento";
  private tableParcelaPedidoCompra = "omie.parcela_pedido_compra";
  private tablePedidoCompra = "omie.pedido_compra";
  private tablePedidoCompraDepartamento = "omie.pedido_compra_departamento";
  private tableProduto = "omie.produto";
  private tableTag = "omie.tag";
  private tableTagClienteFornecedor = "omie.tag_cliente_fornecedor";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // caracteristica_cliente_fornecedor
    await queryRunner.dropIndex(
      this.tableCaracteristicaClienteFornecedor,
      "fk_CARACTERISTICAS_CLIENTE_FORNECEDOR_CLIENTE_FORNECEDOR1"
    );
    await queryRunner.createIndex(
      this.tableCaracteristicaClienteFornecedor,
      new TableIndex({
        name: "cod_cli_omie_caract_cli_forn_index",
        columnNames: ["id_empresa", "codigo_cliente_omie"],
      })
    );
    await queryRunner.createIndex(
      this.tableCaracteristicaClienteFornecedor,
      new TableIndex({
        name: "cod_cli_omie_id_empresa_caract_cli_forn_index",
        columnNames: ["codigo_cliente_omie"],
      })
    );
    await queryRunner.createIndex(
      this.tableCaracteristicaClienteFornecedor,
      new TableIndex({
        name: "id_emp_caract_cli_forn_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableCaracteristicaClienteFornecedor,
      new TableIndex({
        name: "campo_caract_cli_forn_index",
        columnNames: ["campo"],
      })
    );

    // categoria_conta_pagar
    await queryRunner.dropIndex(
      this.tableCategoriaContaPagar,
      "fk_CONTA_PAGAR_CATEGORIA_CONTA_PAGAR1"
    );
    await queryRunner.dropIndex(
      this.tableCategoriaContaPagar,
      "fk_CONTA_PAGAR_CATEGORIA_CATEGORIA1"
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaPagar,
      new TableIndex({
        name: "cod_id_empresa_lanc_omie_categ_cta_pag_index",
        columnNames: ["id_empresa", "codigo_lancamento_omie"],
      })
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaPagar,
      new TableIndex({
        name: "cod_lanc_omie_categ_cta_pag_index",
        columnNames: ["codigo_lancamento_omie"],
      })
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaPagar,
      new TableIndex({
        name: "cod_categ_categ_cta_pag_index",
        columnNames: ["codigo_categoria"],
      })
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaPagar,
      new TableIndex({
        name: "id_empresa_categ_cta_pag_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaPagar,
      new TableIndex({
        name: "valor_categ_cta_pag_index",
        columnNames: ["valor"],
      })
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaPagar,
      new TableIndex({
        name: "percentual_categ_cta_pag_index",
        columnNames: ["percentual"],
      })
    );

    // categoria_conta_receber
    await queryRunner.dropIndex(
      this.tableCategoriaContaReceber,
      "fk_CONTA_RECEBER_CATEGORIA_CONTA_RECEBER1"
    );
    await queryRunner.dropIndex(
      this.tableCategoriaContaReceber,
      "fk_CONTA_RECEBER_CATEGORIA"
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaReceber,
      new TableIndex({
        name: "cod_lanc_omie_id_empresa_categ_cta_rec_index",
        columnNames: ["id_empresa", "codigo_lancamento_omie"],
      })
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaReceber,
      new TableIndex({
        name: "cod_lanc_omie_categ_cta_rec_index",
        columnNames: ["codigo_lancamento_omie"],
      })
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaReceber,
      new TableIndex({
        name: "cod_categ_categ_cta_rec_index",
        columnNames: ["codigo_categoria"],
      })
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaReceber,
      new TableIndex({
        name: "id_empresa_categ_cta_rec_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaReceber,
      new TableIndex({
        name: "valor_categ_cta_rec_index",
        columnNames: ["valor"],
      })
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaReceber,
      new TableIndex({
        name: "percentual_categ_cta_rec_index",
        columnNames: ["percentual"],
      })
    );

    // cliente_fornecedor
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "fk_CLIENTE_FORNECEDOR_EMPRESAS1"
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "cod_cli_omie_cliente_fornecedor_index",
        columnNames: ["codigo_cliente_omie"],
      })
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "id_empresa_cliente_fornecedor_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "cod_cli_omie_id_empresa_cliente_fornecedor_index",
        columnNames: ["id_empresa", "codigo_cliente_omie"],
      })
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "cod_cli_integ_cliente_fornecedor_index",
        columnNames: ["codigo_cliente_integracao"],
      })
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "raz_soc_cliente_fornecedor_index",
        columnNames: ["razao_social"],
      })
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "cnpj_cpf_cliente_fornecedor_index",
        columnNames: ["cnpj_cpf"],
      })
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "cnpj_cpf_id_empresa_cliente_fornecedor_index",
        columnNames: ["cnpj_cpf", "id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "nome_fant_cliente_fornecedor_index",
        columnNames: ["nome_fantasia"],
      })
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "endereco_cliente_fornecedor_index",
        columnNames: ["endereco"],
      })
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "bairro_cliente_fornecedor_index",
        columnNames: ["bairro"],
      })
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "estado_cliente_fornecedor_index",
        columnNames: ["estado"],
      })
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "cidade_cliente_fornecedor_index",
        columnNames: ["cidade"],
      })
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "pes_fisica_cliente_fornecedor_index",
        columnNames: ["pessoa_fisica"],
      })
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "inativo_cliente_fornecedor_index",
        columnNames: ["inativo"],
      })
    );

    // conta_pagar
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "fk_CONTA_PAGAR_EMPRESA1"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "fk_CONTA_PAGAR_CLIENTE_FORNECEDOR1"
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "cod_lanc_omie_conta_pagar_index",
        columnNames: ["codigo_lancamento_omie"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "id_empresa_conta_pagar_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "cod_cli_forn_conta_pagar_index",
        columnNames: ["codigo_cliente_fornecedor"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "cod_lanc_integ_id_empresa_conta_pagar_index",
        columnNames: ["codigo_lancamento_integracao", "id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "cod_lanc_integ_conta_pagar_index",
        columnNames: ["codigo_lancamento_integracao"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "cod_cli_forn_integ_conta_pagar_index",
        columnNames: ["codigo_cliente_fornecedor_integracao"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "dt_venc_conta_pagar_index",
        columnNames: ["data_vencimento"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "valor_doc_conta_pagar_index",
        columnNames: ["valor_documento"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "cod_categ_conta_pagar_index",
        columnNames: ["codigo_categoria"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "dt_previsao_conta_pagar_index",
        columnNames: ["data_previsao"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "num_doc_fisc_conta_pagar_index",
        columnNames: ["numero_documento_fiscal"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "dt_emissao_conta_pagar_index",
        columnNames: ["data_emissao"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "dt_entrada_conta_pagar_index",
        columnNames: ["data_entrada"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "cod_projeto_previsao_conta_pagar_index",
        columnNames: ["codigo_projeto"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "num_pedido_conta_pagar_index",
        columnNames: ["numero_pedido"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "num_doc_conta_pagar_index",
        columnNames: ["numero_documento"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "num_parc_conta_pagar_index",
        columnNames: ["numero_parcela"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "cod_vend_conta_pagar_index",
        columnNames: ["codigo_vendedor"],
      })
    );

    // conta_receber
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "fk_CONTA_RECEBER_EMPRESAS1"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "fk_CONTA_RECEBER_CLIENTE_FORNECEDOR1"
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "cod_lanc_omie_conta_receber_index",
        columnNames: ["codigo_lancamento_omie"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "id_empresa_conta_receber_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "cod_cli_forn_conta_receber_index",
        columnNames: ["codigo_cliente_fornecedor"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "cod_lanc_integ_conta_receber_index",
        columnNames: ["codigo_lancamento_integracao"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "cod_cli_forn_integ_conta_receber_index",
        columnNames: ["codigo_cliente_fornecedor_integracao"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "cod_lanc_integ_id_empresa_conta_receber_index",
        columnNames: ["codigo_lancamento_integracao", "id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "dt_venc_conta_receber_index",
        columnNames: ["data_vencimento"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "valor_doc_conta_receber_index",
        columnNames: ["valor_documento"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "cod_categ_conta_receber_index",
        columnNames: ["codigo_categoria"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "dt_previsao_conta_receber_index",
        columnNames: ["data_previsao"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "num_doc_conta_receber_index",
        columnNames: ["numero_documento"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "num_parc_conta_receber_index",
        columnNames: ["numero_parcela"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "num_doc_fisc_conta_receber_index",
        columnNames: ["numero_documento_fiscal"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "num_pedido_conta_receber_index",
        columnNames: ["numero_pedido"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "dt_emissao_conta_receber_index",
        columnNames: ["data_emissao"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "stat_titulo_conta_receber_index",
        columnNames: ["status_titulo"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "cod_vend_conta_receber_index",
        columnNames: ["codigo_vendedor"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "cod_projeto_previsao_conta_receber_index",
        columnNames: ["codigo_projeto"],
      })
    );

    // distribuicao_conta_pagar
    await queryRunner.dropIndex(
      this.tableDistribuicaoContaPagar,
      "fk_CONTA_PAGAR_DEPARTAMENTO_CONTA_PAGAR1"
    );
    await queryRunner.dropIndex(
      this.tableDistribuicaoContaPagar,
      "fk_CONTA_PAGAR_DEPARTAMENTO_DEPARTAMENTO1"
    );
    await queryRunner.createIndex(
      this.tableDistribuicaoContaPagar,
      new TableIndex({
        name: "cod_lanc_omie_id_empresa_distr_cta_pag_index",
        columnNames: ["codigo_lancamento_omie", "id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableDistribuicaoContaPagar,
      new TableIndex({
        name: "cod_lanc_omie_distr_cta_pag_index",
        columnNames: ["codigo_lancamento_omie"],
      })
    );
    await queryRunner.createIndex(
      this.tableDistribuicaoContaPagar,
      new TableIndex({
        name: "cod_dep_distr_cta_pag_index",
        columnNames: ["ccoddep"],
      })
    );
    await queryRunner.createIndex(
      this.tableDistribuicaoContaPagar,
      new TableIndex({
        name: "id_empresa_distr_cta_pag_index",
        columnNames: ["id_empresa"],
      })
    );

    // distribuicao_conta_receber
    await queryRunner.dropIndex(
      this.tableDistribuicaoContaReceber,
      "fk_DISTRIBUICAO_DOCUMENTO_FINANCEIRO_CONTA_RECEBER1"
    );
    await queryRunner.dropIndex(
      this.tableDistribuicaoContaReceber,
      "fk_DISTRIBUICAO_DOCUMENTO_FINANCEIRO_DEPARTAMENTO1"
    );
    await queryRunner.createIndex(
      this.tableDistribuicaoContaReceber,
      new TableIndex({
        name: "cod_lanc_omie_id_empresa_distr_cta_rec_index",
        columnNames: ["codigo_lancamento_omie", "id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableDistribuicaoContaReceber,
      new TableIndex({
        name: "cod_lanc_omie_distr_cta_rec_index",
        columnNames: ["codigo_lancamento_omie"],
      })
    );
    await queryRunner.createIndex(
      this.tableDistribuicaoContaReceber,
      new TableIndex({
        name: "cod_dep_distr_cta_rec_index",
        columnNames: ["ccoddep"],
      })
    );
    await queryRunner.createIndex(
      this.tableDistribuicaoContaReceber,
      new TableIndex({
        name: "id_empresa_distr_cta_rec_index",
        columnNames: ["id_empresa"],
      })
    );

    // empresa
    await queryRunner.createIndex(
      this.tableEmpresa,
      new TableIndex({
        name: "id_empresa_index",
        columnNames: ["id"],
      })
    );
    await queryRunner.createIndex(
      this.tableEmpresa,
      new TableIndex({
        name: "razao_social_empresa_index",
        columnNames: ["razao_social"],
      })
    );
    await queryRunner.createIndex(
      this.tableEmpresa,
      new TableIndex({
        name: "nome_fantasia_empresa_index",
        columnNames: ["nome_fantasia"],
      })
    );
    await queryRunner.createIndex(
      this.tableEmpresa,
      new TableIndex({
        name: "cnpj_empresa_index",
        columnNames: ["cnpj"],
      })
    );
    await queryRunner.createIndex(
      this.tableEmpresa,
      new TableIndex({
        name: "apelido_empresa_index",
        columnNames: ["apelido"],
      })
    );

    // item_pedido_compra
    await queryRunner.dropIndex(
      this.tableItemPedidoCompra,
      "fk_ITEM_PEDIDO_COMPRA_PEDIDO_COMPRA1"
    );
    await queryRunner.dropIndex(
      this.tableItemPedidoCompra,
      "fk_ITEM_PEDIDO_COMPRA_PRODUTO_SERVICO1"
    );
    await queryRunner.createIndex(
      this.tableItemPedidoCompra,
      new TableIndex({
        name: "cod_ped_item_ped_comp_index",
        columnNames: ["ncodped"],
      })
    );
    await queryRunner.createIndex(
      this.tableItemPedidoCompra,
      new TableIndex({
        name: "id_empresa_item_ped_comp_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableItemPedidoCompra,
      new TableIndex({
        name: "cod_ped_id_empresa_item_ped_comp_index",
        columnNames: ["id_empresa", "ncodped"],
      })
    );
    await queryRunner.createIndex(
      this.tableItemPedidoCompra,
      new TableIndex({
        name: "ncod_item_item_ped_comp_index",
        columnNames: ["ncoditem"],
      })
    );
    await queryRunner.createIndex(
      this.tableItemPedidoCompra,
      new TableIndex({
        name: "ncod_prod_item_ped_comp_index",
        columnNames: ["ncodprod"],
      })
    );
    await queryRunner.createIndex(
      this.tableItemPedidoCompra,
      new TableIndex({
        name: "cproduto_item_ped_comp_index",
        columnNames: ["cproduto"],
      })
    );
    await queryRunner.createIndex(
      this.tableItemPedidoCompra,
      new TableIndex({
        name: "nvaltot_item_ped_comp_index",
        columnNames: ["nvaltot"],
      })
    );

    // lancamento_detalhe
    await queryRunner.createIndex(
      this.tableLancamentoDetalhe,
      new TableIndex({
        name: "cod_lancamento_lancamento_detalhe_index",
        columnNames: ["codigo_lancamento"],
      })
    );
    await queryRunner.createIndex(
      this.tableLancamentoDetalhe,
      new TableIndex({
        name: "ncodint_lancamento_detalhe_index",
        columnNames: ["ncodint"],
      })
    );
    await queryRunner.createIndex(
      this.tableLancamentoDetalhe,
      new TableIndex({
        name: "coo_lancamento_detalhe_index",
        columnNames: ["coo"],
      })
    );
    await queryRunner.createIndex(
      this.tableLancamentoDetalhe,
      new TableIndex({
        name: "ccf_lancamento_detalhe_index",
        columnNames: ["ccf"],
      })
    );
    await queryRunner.createIndex(
      this.tableLancamentoDetalhe,
      new TableIndex({
        name: "id_empresa_lancamento_detalhe_index",
        columnNames: ["id_empresa"],
      })
    );

    // movimento_financeiro
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "fk_MOVIMENTO_FINANCEIRO_CLIENTE_FORNECEDOR1"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "fk_MOVIMENTO_FINANCEIRO_CODIGO_TITULO1"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "fk_MOVIMENTO_FINANCEIRO_EMPRESA1"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "fk_MOVIMENTO_FINANCEIRO_GRUPO"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "fk_MOVIMENTO_FINANCEIRO_ORIGEM"
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "cod_titulo_mov_financeiro_index",
        columnNames: ["ncodtitulo"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "id_empresa_mov_financeiro_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "id_empresa_cod_titulo_mov_financeiro_index",
        columnNames: ["id_empresa", "ncodtitulo"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "ncod_cliente_mov_financeiro_index",
        columnNames: ["ncodcliente"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "corigem_mov_financeiro_index",
        columnNames: ["corigem"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "cgrupo_mov_financeiro_index",
        columnNames: ["cgrupo"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "ccodprojeto_mov_financeiro_index",
        columnNames: ["ccodprojeto"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "ccod_int_titulo_mov_financeiro_index",
        columnNames: ["ccodinttitulo"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "cnum_titulo_mov_financeiro_index",
        columnNames: ["cnumtitulo"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "dt_emissao_mov_financeiro_index",
        columnNames: ["ddtemissao"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "dt_venc_mov_financeiro_index",
        columnNames: ["ddtvenc"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "dt_previsao_mov_financeiro_index",
        columnNames: ["ddtprevisao"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "dt_pagamento_mov_financeiro_index",
        columnNames: ["ddtpagamento"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "cpf_cnpj_mov_financeiro_index",
        columnNames: ["ccpfcnpjcliente"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "cod_ctr_mov_financeiro_index",
        columnNames: ["ncodctr"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "num_ctr_mov_financeiro_index",
        columnNames: ["cnumctr"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "status_mov_financeiro_index",
        columnNames: ["cstatus"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "tipo_mov_financeiro_index",
        columnNames: ["ctipo"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "num_doc_fiscal_mov_financeiro_index",
        columnNames: ["cnumdocfiscal"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "cod_categ_mov_financeiro_index",
        columnNames: ["ccodcateg"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "numero_parcela_mov_financeiro_index",
        columnNames: ["cnumparcela"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "valor_titulo_mov_financeiro_index",
        columnNames: ["nvalortitulo"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "cod_vendedor_mov_financeiro_index",
        columnNames: ["ccodvendedor"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "dt_credito_mov_financeiro_index",
        columnNames: ["ddtcredito"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "dt_concilia_mov_financeiro_index",
        columnNames: ["ddtconcilia"],
      })
    );

    // movimento_financeiro_categoria
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiroCategoria,
      "fk_MOVIMENTO_FINANCEIRO_has_CATEGORIA_CATEGORIA1"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiroCategoria,
      "fk_MOVIMENTO_FINANCEIRO_has_CATEGORIA_MOVIMENTO_FINANCEIRO1"
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiroCategoria,
      new TableIndex({
        name: "cod_titulo_mov_financeiro_categoria_index",
        columnNames: ["ncodtitulo"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiroCategoria,
      new TableIndex({
        name: "id_empresa_mov_financeiro_categoria_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiroCategoria,
      new TableIndex({
        name: "cod_titulo_id_empresa_mov_financeiro_categoria_index",
        columnNames: ["id_empresa", "ncodtitulo"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiroCategoria,
      new TableIndex({
        name: "codigo_mov_financeiro_categoria_index",
        columnNames: ["codigo"],
      })
    );

    // movimento_financeiro_departamento
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiroDepartamento,
      "fk_MOVIMENTO_FINANCEIRO_has_DEPARTAMENTO_DEPARTAMENTO1"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiroDepartamento,
      "fk_MOVIMENTO_FINANCEIRO_has_DEPARTAMENTO_MOVIMENTO_FINANCEIRO1"
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiroDepartamento,
      new TableIndex({
        name: "cod_titulo_mov_financeiro_departamento_index",
        columnNames: ["ncodtitulo"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiroDepartamento,
      new TableIndex({
        name: "id_empresa_mov_financeiro_departamento_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiroDepartamento,
      new TableIndex({
        name: "cod_titulo_id_empresa_mov_financeiro_departamento_index",
        columnNames: ["ncodtitulo", "id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiroDepartamento,
      new TableIndex({
        name: "codigo_mov_financeiro_departamento_index",
        columnNames: ["codigo"],
      })
    );

    // parcela_pedido_compra
    await queryRunner.dropIndex(
      this.tableParcelaPedidoCompra,
      "fk_PARCELA_PEDIDO_COMPRA_PEDIDO_COMPRA1"
    );
    await queryRunner.createIndex(
      this.tableParcelaPedidoCompra,
      new TableIndex({
        name: "codigo_pedido_parcela_pedido_compra_index",
        columnNames: ["ncodped"],
      })
    );
    await queryRunner.createIndex(
      this.tableParcelaPedidoCompra,
      new TableIndex({
        name: "parcela_parcela_pedido_compra_index",
        columnNames: ["nparcela"],
      })
    );
    await queryRunner.createIndex(
      this.tableParcelaPedidoCompra,
      new TableIndex({
        name: "id_empresa_parcela_pedido_compra_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableParcelaPedidoCompra,
      new TableIndex({
        name: "dt_vencimento_parcela_pedido_compra_index",
        columnNames: ["dvencto"],
      })
    );
    await queryRunner.createIndex(
      this.tableParcelaPedidoCompra,
      new TableIndex({
        name: "valor_parcela_pedido_compra_index",
        columnNames: ["nvalor"],
      })
    );

    // pedido_compra
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "fk_PEDIDO_COMPRA_EMPRESA1"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "fk_PEDIDO_COMPRA_PARCELAS1"
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "cod_pedido_pedido_compra_index",
        columnNames: ["ncodped"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "cod_empresa_pedido_compra_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "cod_pedido_cod_empresa_pedido_compra_index",
        columnNames: ["ncodped", "id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "cod_int_pedido_pedido_compra_index",
        columnNames: ["ccodintped"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "dt_inclusao_pedido_compra_index",
        columnNames: ["dincdata"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "numero_pedido_compra_index",
        columnNames: ["cnumero"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "dt_previsao_pedido_compra_index",
        columnNames: ["ddtprevisao"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "cod_parcela_pedido_compra_index",
        columnNames: ["ccodparc"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "cod_for_pedido_compra_index",
        columnNames: ["ncodfor"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "cod_int_for_pedido_compra_index",
        columnNames: ["ccodintfor"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "cod_categoria_pedido_compra_index",
        columnNames: ["ccodcateg"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "cod_comprador_pedido_compra_index",
        columnNames: ["ncodcompr"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "cod_int_cc_pedido_compra_index",
        columnNames: ["ncodintcc"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "cod_projeto_pedido_compra_index",
        columnNames: ["ncodproj"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "num_pedido_pedido_compra_index",
        columnNames: ["cnumpedido"],
      })
    );

    // pedido_compra_departamento
    await queryRunner.dropIndex(
      this.tablePedidoCompraDepartamento,
      "fk_PEDIDO_COMPRA_has_DEPARTAMENTO_DEPARTAMENTO1"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompraDepartamento,
      "fk_PEDIDO_COMPRA_has_DEPARTAMENTO_PEDIDO_COMPRA1"
    );
    await queryRunner.createIndex(
      this.tablePedidoCompraDepartamento,
      new TableIndex({
        name: "cod_pedido_pedido_compra_departamento_index",
        columnNames: ["ncodped"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompraDepartamento,
      new TableIndex({
        name: "id_empresa_pedido_pedido_compra_departamento_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompraDepartamento,
      new TableIndex({
        name: "cod_pedido_id_empresa_pedido_compra_departamento_index",
        columnNames: ["ncodped", "id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompraDepartamento,
      new TableIndex({
        name: "cod_departamento_pedido_compra_departamento_index",
        columnNames: ["ccoddepto"],
      })
    );

    // produtos
    await queryRunner.dropIndex(this.tableProduto, "fk_PRODUTO_EMPRESAS1");
    await queryRunner.createIndex(
      this.tableProduto,
      new TableIndex({
        name: "cod_produto_produto_index",
        columnNames: ["codigo_produto"],
      })
    );
    await queryRunner.createIndex(
      this.tableProduto,
      new TableIndex({
        name: "id_empresa_produto_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableProduto,
      new TableIndex({
        name: "cod_produto_id_empresa_produto_index",
        columnNames: ["codigo_produto", "id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableProduto,
      new TableIndex({
        name: "cod_produto_integracao_produto_index",
        columnNames: ["codigo_produto_integracao"],
      })
    );
    await queryRunner.createIndex(
      this.tableProduto,
      new TableIndex({
        name: "descricao_produto_index",
        columnNames: ["descricao"],
      })
    );

    // tag
    await queryRunner.dropIndex(this.tableTag, "fk_TAG_COD_TAG1");
    await queryRunner.dropIndex(this.tableTag, "fk_TAG_EMPRESA1");
    await queryRunner.createIndex(
      this.tableTag,
      new TableIndex({
        name: "cod_tag_tag_index",
        columnNames: ["ncodtag"],
      })
    );
    await queryRunner.createIndex(
      this.tableTag,
      new TableIndex({
        name: "id_empresa_tag_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableTag,
      new TableIndex({
        name: "tag_tag_index",
        columnNames: ["tag"],
      })
    );

    // tag_cliente_fornecedor
    await queryRunner.dropIndex(
      this.tableTagClienteFornecedor,
      "fk_TAG_CLIENTE_FORNECEDOR_CLIENTE_FORNECEDOR1"
    );
    await queryRunner.dropIndex(
      this.tableTagClienteFornecedor,
      "fk_TAG_CLIENTE_FORNECEDOR_TAG1"
    );
    await queryRunner.createIndex(
      this.tableTagClienteFornecedor,
      new TableIndex({
        name: "cod_cliente_omie_tag_cliente_fornecedor_index",
        columnNames: ["codigo_cliente_omie"],
      })
    );
    await queryRunner.createIndex(
      this.tableTagClienteFornecedor,
      new TableIndex({
        name: "id_empresa_tag_cliente_fornecedor_index",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableTagClienteFornecedor,
      new TableIndex({
        name: "cod_tag_tag_cliente_fornecedor_index",
        columnNames: ["ncodtag"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // caracteristica_cliente_fornecedor
    await queryRunner.dropIndex(
      this.tableCaracteristicaClienteFornecedor,
      "cod_cli_omie_caract_cli_forn_index"
    );
    await queryRunner.dropIndex(
      this.tableCaracteristicaClienteFornecedor,
      "cod_cli_omie_id_empresa_caract_cli_forn_index"
    );
    await queryRunner.dropIndex(
      this.tableCaracteristicaClienteFornecedor,
      "id_emp_caract_cli_forn_index"
    );
    await queryRunner.dropIndex(
      this.tableCaracteristicaClienteFornecedor,
      "campo_caract_cli_forn_index"
    );
    await queryRunner.createIndex(
      this.tableCaracteristicaClienteFornecedor,
      new TableIndex({
        name: "fk_CARACTERISTICAS_CLIENTE_FORNECEDOR_CLIENTE_FORNECEDOR1",
        columnNames: ["id_empresa", "codigo_cliente_omie"],
      })
    );

    // categoria_conta_pagar
    await queryRunner.dropIndex(
      this.tableCategoriaContaPagar,
      "cod_lanc_omie_categ_cta_pag_index"
    );
    await queryRunner.dropIndex(
      this.tableCategoriaContaPagar,
      "cod_lanc_omie_categ_cta_pag_index"
    );
    await queryRunner.dropIndex(
      this.tableCategoriaContaPagar,
      "cod_categ_categ_cta_pag_index"
    );
    await queryRunner.dropIndex(
      this.tableCategoriaContaPagar,
      "id_empresa_categ_cta_pag_index"
    );
    await queryRunner.dropIndex(
      this.tableCategoriaContaPagar,
      "valor_categ_cta_pag_index"
    );
    await queryRunner.dropIndex(
      this.tableCategoriaContaPagar,
      "percentual_categ_cta_pag_index"
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaPagar,
      new TableIndex({
        name: "fk_CARACTERISTICAS_CLIENTE_FORNECEDOR_CLIENTE_FORNECEDOR1",
        columnNames: ["codigo_categoria"],
      })
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaPagar,
      new TableIndex({
        name: "fk_CONTA_PAGAR_CATEGORIA_CONTA_PAGAR1",
        columnNames: ["id_empresa", "codigo_cliente_omie"],
      })
    );

    // categoria_conta_receber
    await queryRunner.dropIndex(
      this.tableCategoriaContaReceber,
      "cod_lanc_omie_id_empresa_categ_cta_rec_index"
    );
    await queryRunner.dropIndex(
      this.tableCategoriaContaReceber,
      "cod_lanc_omie_categ_cta_rec_index"
    );
    await queryRunner.dropIndex(
      this.tableCategoriaContaReceber,
      "cod_categ_categ_cta_rec_index"
    );
    await queryRunner.dropIndex(
      this.tableCategoriaContaReceber,
      "id_empresa_categ_cta_rec_index"
    );
    await queryRunner.dropIndex(
      this.tableCategoriaContaReceber,
      "valor_categ_cta_rec_index"
    );
    await queryRunner.dropIndex(
      this.tableCategoriaContaReceber,
      "percentual_categ_cta_rec_index"
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaReceber,
      new TableIndex({
        name: "fk_CONTA_RECEBER_CATEGORIA_CONTA_RECEBER1",
        columnNames: ["id_empresa", "codigo_cliente_omie"],
      })
    );
    await queryRunner.createIndex(
      this.tableCategoriaContaReceber,
      new TableIndex({
        name: "fk_CONTA_RECEBER_CATEGORIA",
        columnNames: ["codigo_categoria"],
      })
    );

    // cliente_fornecedor
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "cod_cli_omie_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "id_empresa_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "cod_cli_omie_id_empresa_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "cod_cli_integ_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "raz_soc_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "cnpj_cpf_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "cnpj_cpf_id_empresa_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "nome_fant_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "endereco_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "bairro_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "estado_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "cidade_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "pes_fisica_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableClienteFornecedor,
      "inativo_cliente_fornecedor_index"
    );
    await queryRunner.createIndex(
      this.tableClienteFornecedor,
      new TableIndex({
        name: "fk_CLIENTE_FORNECEDOR_EMPRESAS1",
        columnNames: ["id_empresa"],
      })
    );

    // conta_pagar
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "cod_lanc_omie_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "id_empresa_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "cod_cli_forn_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "cod_lanc_integ_id_empresa_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "cod_lanc_integ_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "cod_cli_forn_integ_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "dt_venc_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "valor_doc_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "cod_categ_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "dt_previsao_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "num_doc_fisc_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "dt_emissao_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "dt_entrada_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "cod_projeto_previsao_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "num_pedido_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "num_doc_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "num_parc_conta_pagar_index"
    );
    await queryRunner.dropIndex(
      this.tableContaPagar,
      "cod_vend_conta_pagar_index"
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "fk_CONTA_PAGAR_EMPRESA1",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaPagar,
      new TableIndex({
        name: "fk_CONTA_PAGAR_CLIENTE_FORNECEDOR1",
        columnNames: ["codigo_cliente_fornecedor"],
      })
    );

    // conta_receber
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "cod_lanc_omie_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "id_empresa_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "cod_cli_forn_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "cod_lanc_integ_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "cod_cli_forn_integ_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "cod_lanc_integ_id_empresa_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "dt_venc_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "valor_doc_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "cod_categ_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "dt_previsao_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "num_doc_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "num_parc_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "num_doc_fisc_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "num_pedido_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "dt_emissao_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "stat_titulo_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "cod_vend_conta_receber_index"
    );
    await queryRunner.dropIndex(
      this.tableContaReceber,
      "cod_projeto_previsao_conta_receber_index"
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "fk_CONTA_RECEBER_EMPRESAS1",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableContaReceber,
      new TableIndex({
        name: "fk_CONTA_RECEBER_CLIENTE_FORNECEDOR1",
        columnNames: ["codigo_cliente_fornecedor"],
      })
    );

    // distribuicao_conta_pagar
    await queryRunner.dropIndex(
      this.tableDistribuicaoContaPagar,
      "cod_lanc_omie_id_empresa_distr_cta_pag_index"
    );
    await queryRunner.dropIndex(
      this.tableDistribuicaoContaPagar,
      "cod_lanc_omie_distr_cta_pag_index"
    );
    await queryRunner.dropIndex(
      this.tableDistribuicaoContaPagar,
      "cod_dep_distr_cta_pag_index"
    );
    await queryRunner.dropIndex(
      this.tableDistribuicaoContaPagar,
      "id_empresa_distr_cta_pag_index"
    );
    await queryRunner.createIndex(
      this.tableDistribuicaoContaPagar,
      new TableIndex({
        name: "fk_CONTA_PAGAR_DEPARTAMENTO_CONTA_PAGAR1",
        columnNames: ["codigo_lancamento_omie", "id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableDistribuicaoContaPagar,
      new TableIndex({
        name: "fk_CONTA_PAGAR_DEPARTAMENTO_DEPARTAMENTO1",
        columnNames: ["ccoddep"],
      })
    );

    // distribuicao_conta_receber
    await queryRunner.dropIndex(
      this.tableDistribuicaoContaReceber,
      "cod_lanc_omie_id_empresa_distr_cta_rec_index"
    );
    await queryRunner.dropIndex(
      this.tableDistribuicaoContaReceber,
      "cod_lanc_omie_distr_cta_rec_index"
    );
    await queryRunner.dropIndex(
      this.tableDistribuicaoContaReceber,
      "cod_dep_distr_cta_rec_index"
    );
    await queryRunner.dropIndex(
      this.tableDistribuicaoContaReceber,
      "id_empresa_distr_cta_rec_index"
    );
    await queryRunner.createIndex(
      this.tableDistribuicaoContaReceber,
      new TableIndex({
        name: "fk_DISTRIBUICAO_DOCUMENTO_FINANCEIRO_CONTA_RECEBER1",
        columnNames: ["codigo_lancamento_omie", "id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableDistribuicaoContaReceber,
      new TableIndex({
        name: "fk_DISTRIBUICAO_DOCUMENTO_FINANCEIRO_DEPARTAMENTO1",
        columnNames: ["ccoddep"],
      })
    );

    // empresa
    await queryRunner.dropIndex(this.tableEmpresa, "id_empresa_index");
    await queryRunner.dropIndex(
      this.tableEmpresa,
      "razao_social_empresa_index"
    );
    await queryRunner.dropIndex(
      this.tableEmpresa,
      "nome_fantasia_empresa_index"
    );
    await queryRunner.dropIndex(this.tableEmpresa, "cnpj_empresa_index");
    await queryRunner.dropIndex(this.tableEmpresa, "apelido_empresa_index");

    // item_pedido_compra
    await queryRunner.dropIndex(
      this.tableItemPedidoCompra,
      "cod_ped_item_ped_comp_index"
    );
    await queryRunner.dropIndex(
      this.tableItemPedidoCompra,
      "id_empresa_item_ped_comp_index"
    );
    await queryRunner.dropIndex(
      this.tableItemPedidoCompra,
      "cod_ped_id_empresa_item_ped_comp_index"
    );
    await queryRunner.dropIndex(
      this.tableItemPedidoCompra,
      "ncod_item_item_ped_comp_index"
    );
    await queryRunner.dropIndex(
      this.tableItemPedidoCompra,
      "ncod_prod_item_ped_comp_index"
    );
    await queryRunner.dropIndex(
      this.tableItemPedidoCompra,
      "cproduto_item_ped_comp_index"
    );
    await queryRunner.dropIndex(
      this.tableItemPedidoCompra,
      "nvaltot_item_ped_comp_index"
    );
    await queryRunner.createIndex(
      this.tableItemPedidoCompra,
      new TableIndex({
        name: "fk_ITEM_PEDIDO_COMPRA_PEDIDO_COMPRA1",
        columnNames: ["ncodped", "id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableItemPedidoCompra,
      new TableIndex({
        name: "fk_ITEM_PEDIDO_COMPRA_PRODUTO_SERVICO1",
        columnNames: ["ncodprod"],
      })
    );

    // lancamento_detalhe
    await queryRunner.dropIndex(
      this.tableLancamentoDetalhe,
      "cod_lancamento_lancamento_detalhe_index"
    );
    await queryRunner.dropIndex(
      this.tableLancamentoDetalhe,
      "ncodint_lancamento_detalhe_index"
    );
    await queryRunner.dropIndex(
      this.tableLancamentoDetalhe,
      "coo_lancamento_detalhe_index"
    );
    await queryRunner.dropIndex(
      this.tableLancamentoDetalhe,
      "ccf_lancamento_detalhe_index"
    );
    await queryRunner.dropIndex(
      this.tableLancamentoDetalhe,
      "id_empresa_lancamento_detalhe_index"
    );

    // movimento_financeiro
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "cod_titulo_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "id_empresa_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "id_empresa_cod_titulo_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "ncod_cliente_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "corigem_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "cgrupo_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "ccodprojeto_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "ccod_int_titulo_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "cnum_titulo_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "dt_emissao_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "dt_venc_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "dt_previsao_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "dt_pagamento_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "cpf_cnpj_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "cod_ctr_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "num_ctr_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "status_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "tipo_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "num_doc_fiscal_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "cod_categ_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "numero_parcela_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "valor_titulo_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "cod_vendedor_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "dt_credito_mov_financeiro_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiro,
      "dt_concilia_mov_financeiro_index"
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "fk_MOVIMENTO_FINANCEIRO_CLIENTE_FORNECEDOR1",
        columnNames: ["ncodcliente"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "fk_MOVIMENTO_FINANCEIRO_CODIGO_TITULO1",
        columnNames: ["ncodtitulo"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "fk_MOVIMENTO_FINANCEIRO_EMPRESA1",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "fk_MOVIMENTO_FINANCEIRO_GRUPO",
        columnNames: ["cgrupo"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiro,
      new TableIndex({
        name: "fk_MOVIMENTO_FINANCEIRO_ORIGEM",
        columnNames: ["corigem"],
      })
    );

    // movimento_financeiro_categoria
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiroCategoria,
      "cod_titulo_mov_financeiro_categoria_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiroCategoria,
      "id_empresa_mov_financeiro_categoria_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiroCategoria,
      "cod_titulo_id_empresa_mov_financeiro_categoria_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiroCategoria,
      "codigo_mov_financeiro_categoria_index"
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiroCategoria,
      new TableIndex({
        name: "fk_MOVIMENTO_FINANCEIRO_has_CATEGORIA_CATEGORIA1",
        columnNames: ["codigo"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiroCategoria,
      new TableIndex({
        name: "fk_MOVIMENTO_FINANCEIRO_has_CATEGORIA_MOVIMENTO_FINANCEIRO1",
        columnNames: ["ncodtitulo", "id_empresa"],
      })
    );

    // movimento_financeiro_departamento
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiroDepartamento,
      "cod_titulo_mov_financeiro_departamento_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiroDepartamento,
      "id_empresa_mov_financeiro_departamento_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiroDepartamento,
      "cod_titulo_id_empresa_mov_financeiro_departamento_index"
    );
    await queryRunner.dropIndex(
      this.tableMovimentoFinanceiroDepartamento,
      "codigo_mov_financeiro_departamento_index"
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiroDepartamento,
      new TableIndex({
        name: "fk_MOVIMENTO_FINANCEIRO_has_DEPARTAMENTO_DEPARTAMENTO1",
        columnNames: ["codigo"],
      })
    );
    await queryRunner.createIndex(
      this.tableMovimentoFinanceiroDepartamento,
      new TableIndex({
        name: "fk_MOVIMENTO_FINANCEIRO_has_DEPARTAMENTO_MOVIMENTO_FINANCEIRO1",
        columnNames: ["ncodtitulo", "id_empresa"],
      })
    );

    // parcela_pedido_compra
    await queryRunner.dropIndex(
      this.tableParcelaPedidoCompra,
      "codigo_pedido_parcela_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tableParcelaPedidoCompra,
      "parcela_parcela_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tableParcelaPedidoCompra,
      "id_empresa_parcela_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tableParcelaPedidoCompra,
      "dt_vencimento_parcela_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tableParcelaPedidoCompra,
      "valor_parcela_pedido_compra_index"
    );
    await queryRunner.createIndex(
      this.tableParcelaPedidoCompra,
      new TableIndex({
        name: "fk_PARCELA_PEDIDO_COMPRA_PEDIDO_COMPRA1",
        columnNames: ["ncodped", "id_empresa"],
      })
    );

    // pedido_compra
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "cod_pedido_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "cod_empresa_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "cod_pedido_cod_empresa_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "cod_int_pedido_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "dt_inclusao_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "numero_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "dt_previsao_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "cod_parcela_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "cod_for_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "cod_int_for_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "cod_categoria_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "cod_comprador_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "cod_int_cc_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "cod_projeto_pedido_compra_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompra,
      "num_pedido_pedido_compra_index"
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "fk_PEDIDO_COMPRA_EMPRESA1",
        columnNames: ["id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompra,
      new TableIndex({
        name: "fk_PEDIDO_COMPRA_PARCELAS1",
        columnNames: ["ccodparc"],
      })
    );

    // pedido_compra_departamento
    await queryRunner.dropIndex(
      this.tablePedidoCompraDepartamento,
      "cod_pedido_pedido_compra_departamento_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompraDepartamento,
      "id_empresa_pedido_pedido_compra_departamento_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompraDepartamento,
      "cod_pedido_id_empresa_pedido_compra_departamento_index"
    );
    await queryRunner.dropIndex(
      this.tablePedidoCompraDepartamento,
      "cod_departamento_pedido_compra_departamento_index"
    );
    await queryRunner.createIndex(
      this.tablePedidoCompraDepartamento,
      new TableIndex({
        name: "fk_PEDIDO_COMPRA_has_DEPARTAMENTO_DEPARTAMENTO1",
        columnNames: ["ccoddepto"],
      })
    );
    await queryRunner.createIndex(
      this.tablePedidoCompraDepartamento,
      new TableIndex({
        name: "fk_PEDIDO_COMPRA_has_DEPARTAMENTO_PEDIDO_COMPRA1",
        columnNames: ["ncodped", "id_empresa"],
      })
    );

    // produtos
    await queryRunner.dropIndex(this.tableProduto, "cod_produto_produto_index");
    await queryRunner.dropIndex(this.tableProduto, "id_empresa_produto_index");
    await queryRunner.dropIndex(
      this.tableProduto,
      "cod_produto_id_empresa_produto_index"
    );
    await queryRunner.dropIndex(
      this.tableProduto,
      "cod_produto_integracao_produto_index"
    );
    await queryRunner.dropIndex(this.tableProduto, "descricao_produto_index");
    await queryRunner.createIndex(
      this.tableProduto,
      new TableIndex({
        name: "fk_PRODUTO_EMPRESAS1",
        columnNames: ["id_empresa"],
      })
    );

    // tag
    await queryRunner.dropIndex(this.tableTag, "cod_tag_tag_index");
    await queryRunner.dropIndex(this.tableTag, "id_empresa_tag_index");
    await queryRunner.dropIndex(this.tableTag, "tag_tag_index");
    await queryRunner.createIndex(
      this.tableTag,
      new TableIndex({
        name: "fk_TAG_COD_TAG1",
        columnNames: ["ncodtag"],
      })
    );
    await queryRunner.createIndex(
      this.tableTag,
      new TableIndex({
        name: "fk_TAG_EMPRESA1",
        columnNames: ["id_empresa"],
      })
    );

    // tag_cliente_fornecedor
    await queryRunner.dropIndex(
      this.tableTagClienteFornecedor,
      "cod_cliente_omie_tag_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableTagClienteFornecedor,
      "id_empresa_tag_cliente_fornecedor_index"
    );
    await queryRunner.dropIndex(
      this.tableTagClienteFornecedor,
      "cod_tag_tag_cliente_fornecedor_index"
    );
    await queryRunner.createIndex(
      this.tableTagClienteFornecedor,
      new TableIndex({
        name: "fk_TAG_CLIENTE_FORNECEDOR_CLIENTE_FORNECEDOR1",
        columnNames: ["codigo_cliente_omie", "id_empresa"],
      })
    );
    await queryRunner.createIndex(
      this.tableTagClienteFornecedor,
      new TableIndex({
        name: "fk_TAG_CLIENTE_FORNECEDOR_TAG1",
        columnNames: ["ncodtag"],
      })
    );
  }
}

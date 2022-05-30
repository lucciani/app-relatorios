/* eslint-disable no-promise-executor-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { container, injectable } from "tsyringe";

import { UltimaExecucao } from "@modules/omie/infra/typeorm/entities/UltimaExecucao";
import { EmpresaRepository } from "@modules/omie/infra/typeorm/repositories/EmpresaRepository";
import { UltimaExecucaoRepository } from "@modules/omie/infra/typeorm/repositories/UltimaExecucaoRepository";
import { OmieCall } from "@services/omie/enums/OmieCall";

@injectable()
class UltimaExecucaoUseCase {
  private data = "2021-01-01T00:00:00";
  private clienteFornecedor = "cliente_fornecedor";
  private caracteristicaClienteFornecedor = "caracteristica_cliente_fornecedor";
  private tagClienteFornecedor = "tag_cliente_fornecedor";
  private tag = "tag";
  private conta_pagar = "conta_pagar";
  private distribuicaoContaPagar = "distribuicao_conta_pagar";
  private categoriaContaPagar = "categoria_conta_pagar";
  private lancamentoDetalhe = "lancamento_detalhe";
  private contaReceber = "conta_receber";
  private distribuicaoContaReceber = "distribuicao_conta_receber";
  private categoriaContaReceber = "categoria_conta_receber";
  private movimentoFinanceiro = "movimento_financeiro";
  private movimentoFinanceiroCategoria = "movimento_financeiro_categoria";
  private movimentoFinanceiroDepartamento = "movimento_financeiro_departamento";
  private pedidoCompra = "pedido_compra";
  private pedidoCompraDepartamento = "pedido_compra_departamento";
  private itemPedidoCompra = "item_pedido_compra";
  private parcelaPedidoCompra = "parcela_pedido_compra";
  private produto = "produto";
  private empresaRepository: EmpresaRepository;
  private ultimaExecucaoRepository: UltimaExecucaoRepository;

  async execute() {
    this.empresaRepository = container.resolve(EmpresaRepository);
    this.ultimaExecucaoRepository = container.resolve(UltimaExecucaoRepository);
    const empresas = await this.empresaRepository.list();

    // empresas.forEach(async (empresa) => {
    for (const empresa of empresas) {
      const { id: id_empresa } = empresa;

      const cliente_fornecedor = {
        id_empresa,
        nome_api: OmieCall.ListarClientes,
        objeto: this.clienteFornecedor,
        data: this.data,
      } as UltimaExecucao;
      const caracteristica_cliente_fornecedor = {
        id_empresa,
        nome_api: OmieCall.ListarClientes,
        objeto: this.caracteristicaClienteFornecedor,
        data: this.data,
      } as UltimaExecucao;
      const tag_cliente_fornecedor = {
        id_empresa,
        nome_api: OmieCall.ListarTags,
        objeto: this.tagClienteFornecedor,
        data: this.data,
      } as UltimaExecucao;
      const tag = {
        id_empresa,
        nome_api: OmieCall.ListarTags,
        objeto: this.tag,
        data: this.data,
      } as UltimaExecucao;

      const conta_pagar = {
        id_empresa,
        nome_api: OmieCall.ListarContasPagar,
        objeto: this.conta_pagar,
        data: this.data,
      } as UltimaExecucao;
      const distribuicao_conta_pagar = {
        id_empresa,
        nome_api: OmieCall.ListarContasPagar,
        objeto: this.distribuicaoContaPagar,
        data: this.data,
      } as UltimaExecucao;
      const categoria_conta_pagar = {
        id_empresa,
        nome_api: OmieCall.ListarContasPagar,
        objeto: this.categoriaContaPagar,
        data: this.data,
      } as UltimaExecucao;
      const lancamento_detalhe_cp = {
        id_empresa,
        nome_api: OmieCall.ListarContasPagar,
        objeto: this.lancamentoDetalhe,
        data: this.data,
      } as UltimaExecucao;

      const conta_receber = {
        id_empresa,
        nome_api: OmieCall.ListarContasReceber,
        objeto: this.contaReceber,
        data: this.data,
      } as UltimaExecucao;
      const distribuicao_conta_receber = {
        id_empresa,
        nome_api: OmieCall.ListarContasReceber,
        objeto: this.distribuicaoContaReceber,
        data: this.data,
      } as UltimaExecucao;
      const categoria_conta_receber = {
        id_empresa,
        nome_api: OmieCall.ListarContasReceber,
        objeto: this.categoriaContaReceber,
        data: this.data,
      } as UltimaExecucao;
      const lancamento_detalhe_cr = {
        id_empresa,
        nome_api: OmieCall.ListarContasReceber,
        objeto: this.lancamentoDetalhe,
        data: this.data,
      } as UltimaExecucao;

      const movimento_financeiro = {
        id_empresa,
        nome_api: OmieCall.ListarMovimentos,
        objeto: this.movimentoFinanceiro,
        data: this.data,
      } as UltimaExecucao;
      const movimento_financeiro_categoria = {
        id_empresa,
        nome_api: OmieCall.ListarMovimentos,
        objeto: this.movimentoFinanceiroCategoria,
        data: this.data,
      } as UltimaExecucao;
      const movimento_financeiro_departamento = {
        id_empresa,
        nome_api: OmieCall.ListarMovimentos,
        objeto: this.movimentoFinanceiroDepartamento,
        data: this.data,
      } as UltimaExecucao;

      const pedido_compra = {
        id_empresa,
        nome_api: OmieCall.PesquisarPedCompra,
        objeto: this.pedidoCompra,
        data: this.data,
      } as UltimaExecucao;
      const pedido_compra_departamento = {
        id_empresa,
        nome_api: OmieCall.PesquisarPedCompra,
        objeto: this.pedidoCompraDepartamento,
        data: this.data,
      } as UltimaExecucao;
      const item_pedido_compra = {
        id_empresa,
        nome_api: OmieCall.PesquisarPedCompra,
        objeto: this.itemPedidoCompra,
        data: this.data,
      } as UltimaExecucao;
      const parcela_pedido_compra = {
        id_empresa,
        nome_api: OmieCall.PesquisarPedCompra,
        objeto: this.parcelaPedidoCompra,
        data: this.data,
      } as UltimaExecucao;

      const produto = {
        id_empresa,
        nome_api: OmieCall.ListarProdutos,
        objeto: this.produto,
        data: this.data,
      } as UltimaExecucao;

      Promise.all([
        this.inserir(cliente_fornecedor),
        this.inserir(caracteristica_cliente_fornecedor),
        this.inserir(tag_cliente_fornecedor),
        this.inserir(tag),
        this.inserir(conta_pagar),
        this.inserir(distribuicao_conta_pagar),
        this.inserir(categoria_conta_pagar),
        this.inserir(lancamento_detalhe_cp),
        this.inserir(conta_receber),
        this.inserir(distribuicao_conta_receber),
        this.inserir(categoria_conta_receber),
        this.inserir(lancamento_detalhe_cr),
        this.inserir(movimento_financeiro),
        this.inserir(movimento_financeiro_categoria),
        this.inserir(movimento_financeiro_departamento),
        this.inserir(pedido_compra),
        this.inserir(pedido_compra_departamento),
        this.inserir(item_pedido_compra),
        this.inserir(parcela_pedido_compra),
        this.inserir(produto),
      ]);
    }
  }

  async inserir(ultimaExecucao: UltimaExecucao) {
    await this.ultimaExecucaoRepository.insert(ultimaExecucao);
  }
}

export { UltimaExecucaoUseCase };

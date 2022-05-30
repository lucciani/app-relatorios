/* eslint-disable no-promise-executor-return */
/* eslint-disable no-unused-expressions */
import { container, injectable } from "tsyringe";

import { UltimaExecucaoUseCase } from "@modules/omie/useCases/ultimaExecucao/UltimaExecucaoUseCase";
import { ClienteFornecedorOmieServices } from "@services/omie/useCases/buscarClienteFornecedorOMIE/ClienteFornecedorOmieServices";
import { ContasPagarOmieServices } from "@services/omie/useCases/buscarContaPagarOMIE/ContasPagarOmieServices";
import { ContasReceberOmieServices } from "@services/omie/useCases/buscarContaReceberOMIE/ContasReceberOmieServices";
import { MovimentoFinanceiroServices } from "@services/omie/useCases/buscarMovimentoFinanceiroOMIE/MovimentoFinanceiroServices";
import { PedidoCompraOmieServices } from "@services/omie/useCases/buscarPedidoCompraOMIE/PedidoCompraOmieServices";
import { ProdutoOmieServices } from "@services/omie/useCases/buscarProdutoOMIE/ProdutoOmieServices";

@injectable()
class CronService {
  private clienteFornecedorService: ClienteFornecedorOmieServices;
  private contaPagarService: ContasPagarOmieServices;
  private contaReceberService: ContasReceberOmieServices;
  private movimentoFinanceiroService: MovimentoFinanceiroServices;
  private pedidoCompraService: PedidoCompraOmieServices;
  private produtoService: ProdutoOmieServices;
  private ultimaExecucaoUseCase: UltimaExecucaoUseCase;

  constructor() {
    this.clienteFornecedorService = container.resolve(
      ClienteFornecedorOmieServices
    );
    this.contaPagarService = container.resolve(ContasPagarOmieServices);
    this.contaReceberService = container.resolve(ContasReceberOmieServices);
    this.movimentoFinanceiroService = container.resolve(
      MovimentoFinanceiroServices
    );
    this.pedidoCompraService = container.resolve(PedidoCompraOmieServices);
    this.produtoService = container.resolve(ProdutoOmieServices);
    this.ultimaExecucaoUseCase = container.resolve(UltimaExecucaoUseCase);
  }

  execute() {
    (async () => {
      Promise.all([
        this.clienteFornecedorService.execute(),
        await new Promise((r) => setTimeout(r, 60000)),
        this.contaPagarService.execute(),
        await new Promise((r) => setTimeout(r, 60000)),
        this.contaReceberService.execute(),
        await new Promise((r) => setTimeout(r, 60000)),
        this.movimentoFinanceiroService.execute(),
        await new Promise((r) => setTimeout(r, 60000)),
        this.pedidoCompraService.execute(),
        await new Promise((r) => setTimeout(r, 60000)),
        this.produtoService.execute(),
        await new Promise((r) => setTimeout(r, 60000)),
        this.finalizada(),
      ]);
    })();
  }

  async finalizada() {
    console.log(
      `Cron das chamadas da API do OMIE finalizada no instante ${new Date()}`
    );
  }
}

export { CronService };

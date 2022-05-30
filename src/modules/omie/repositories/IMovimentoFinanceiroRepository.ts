import { MovimentoFinanceiro } from "../infra/typeorm/entities/MovimentoFinanceiro";

interface IMovimentoFinanceiroRepository {
  create(
    movimentoFinanceiro: MovimentoFinanceiro
  ): Promise<MovimentoFinanceiro>;
  findByCodTituloCodProjAndEmpresaIdAndCodCliente(
    movimentoFinanceiro: MovimentoFinanceiro
  ): Promise<MovimentoFinanceiro>;
}

export { IMovimentoFinanceiroRepository };

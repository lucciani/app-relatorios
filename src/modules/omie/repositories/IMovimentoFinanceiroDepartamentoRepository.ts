import { MovimentoFinanceiroDepartamento } from "../infra/typeorm/entities/MovimentoFinanceiroDepartamento";

interface IMovimentoFinanceiroDepartamentoRepository {
  create(
    movimentoFinanceiroDepartamento: MovimentoFinanceiroDepartamento
  ): Promise<MovimentoFinanceiroDepartamento>;
  findByCodTituloAndEmpresaIdAndCod(
    movimentoFinanceiroDepartamento: MovimentoFinanceiroDepartamento
  ): Promise<MovimentoFinanceiroDepartamento>;
}

export { IMovimentoFinanceiroDepartamentoRepository };

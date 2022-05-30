import { MovimentoFinanceiroCategoria } from "../infra/typeorm/entities/MovimentoFinanceiroCategoria";

interface IMovimentoFinanceiroCategoriaRepository {
  create(
    movimentoFinanceiroCategoria: MovimentoFinanceiroCategoria
  ): Promise<MovimentoFinanceiroCategoria>;
  findByCodTituloAndEmpresaIdAndCod(
    movimentoFinanceiroCategoria: MovimentoFinanceiroCategoria
  ): Promise<MovimentoFinanceiroCategoria>;
}

export { IMovimentoFinanceiroCategoriaRepository };

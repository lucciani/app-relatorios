import { getRepository, Repository } from "typeorm";

import { IMovimentoFinanceiroCategoriaRepository } from "@modules/omie/repositories/IMovimentoFinanceiroCategoriaRepository";

import { MovimentoFinanceiroCategoria } from "../entities/MovimentoFinanceiroCategoria";

class MovimentoFinanceiroCategoriaRepository
  implements IMovimentoFinanceiroCategoriaRepository
{
  private repository: Repository<MovimentoFinanceiroCategoria>;

  constructor() {
    this.repository = getRepository<MovimentoFinanceiroCategoria>(
      MovimentoFinanceiroCategoria
    );
  }

  async create(
    movimentoFinanceiroCategoria: MovimentoFinanceiroCategoria
  ): Promise<MovimentoFinanceiroCategoria> {
    const movFin = this.repository.create(movimentoFinanceiroCategoria);
    const { ncodtitulo, id_empresa, codigo } = movFin;

    const movimentoFinanceiroCategoriaAtual =
      await this.findByCodTituloAndEmpresaIdAndCod(movFin);

    if (!movimentoFinanceiroCategoriaAtual) {
      const movimentoFinanceiroCategoriaNovo = await this.repository.save(
        movFin
      );
      return movimentoFinanceiroCategoriaNovo;
    }

    movFin.updated_at = new Date();
    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(movimentoFinanceiroCategoriaAtual)
      .returning("*")
      .where("ncodtitulo = :ncodtitulo", {
        ncodtitulo,
      })
      .andWhere("id_empresa = :id_empresa", {
        id_empresa,
      })
      .andWhere("codigo = :codigo", {
        codigo,
      })
      .execute();
    return objAtualizado.raw[0];
  }

  async findByCodTituloAndEmpresaIdAndCod(
    movimentoFinanceiroDepartamento: MovimentoFinanceiroCategoria
  ): Promise<MovimentoFinanceiroCategoria> {
    const { ncodtitulo, id_empresa, codigo } = movimentoFinanceiroDepartamento;
    const movimentoFinanceiroDepartamentoAtual = await this.repository.findOne({
      where: { ncodtitulo, id_empresa, codigo },
    });

    return movimentoFinanceiroDepartamentoAtual;
  }
}

export { MovimentoFinanceiroCategoriaRepository };

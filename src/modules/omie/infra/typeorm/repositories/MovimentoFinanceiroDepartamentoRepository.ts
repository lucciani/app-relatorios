import { getRepository, Repository } from "typeorm";

import { IMovimentoFinanceiroDepartamentoRepository } from "@modules/omie/repositories/IMovimentoFinanceiroDepartamentoRepository";

import { MovimentoFinanceiroDepartamento } from "../entities/MovimentoFinanceiroDepartamento";

class MovimentoFinanceiroDepartamentoRepository
  implements IMovimentoFinanceiroDepartamentoRepository
{
  private repository: Repository<MovimentoFinanceiroDepartamento>;

  constructor() {
    this.repository = getRepository<MovimentoFinanceiroDepartamento>(
      MovimentoFinanceiroDepartamento
    );
  }

  async create(
    movimentoFinanceiroDepartamento: MovimentoFinanceiroDepartamento
  ): Promise<MovimentoFinanceiroDepartamento> {
    const movFin = this.repository.create(movimentoFinanceiroDepartamento);
    const { ncodtitulo, id_empresa, codigo } = movFin;

    const movimentoFinanceiroDeparatamentoAtual =
      await this.findByCodTituloAndEmpresaIdAndCod(movFin);

    if (!movimentoFinanceiroDeparatamentoAtual) {
      const movimentoFinanceiroDeparatamentoNovo = await this.repository.save(
        movFin
      );
      return movimentoFinanceiroDeparatamentoNovo;
    }

    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(movimentoFinanceiroDeparatamentoAtual)
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
    movimentoFinanceiroDepartamento: MovimentoFinanceiroDepartamento
  ): Promise<MovimentoFinanceiroDepartamento> {
    const { ncodtitulo, id_empresa, codigo } = movimentoFinanceiroDepartamento;
    const movimentoFinanceiroDepartamentoAtual = await this.repository.findOne({
      where: { ncodtitulo, id_empresa, codigo },
    });

    return movimentoFinanceiroDepartamentoAtual;
  }
}

export { MovimentoFinanceiroDepartamentoRepository };

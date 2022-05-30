import { getRepository, Repository } from "typeorm";

import { ILancamentoDetalheRepository } from "@modules/omie/repositories/ILancamentoDetalheRepository";

import { LancamentoDetalhe } from "../entities/LancamentoDetalhe";

class LancamentoDetalheRepository implements ILancamentoDetalheRepository {
  private repository: Repository<LancamentoDetalhe>;

  constructor() {
    this.repository = getRepository<LancamentoDetalhe>(LancamentoDetalhe);
  }

  async create(lancamento: LancamentoDetalhe): Promise<LancamentoDetalhe> {
    const lanc = this.repository.create(lancamento);
    const { id_empresa, codigo_lancamento } = lanc;

    const lancamentoAtual = await this.findByCodigoOmieAndEmpresaId(lancamento);

    if (!lancamentoAtual) {
      const lancamentoNovo = await this.repository.save(lanc);
      return lancamentoNovo;
    }

    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(lancamentoAtual)
      .returning("*")
      .where("codigo_lancamento = :codigo_lancamento", {
        codigo_lancamento,
      })
      .andWhere("id_empresa = :id_empresa", {
        id_empresa,
      })
      .execute();
    return objAtualizado.raw[0];
  }

  async findByCodigoOmieAndEmpresaId(
    lancamento: LancamentoDetalhe
  ): Promise<LancamentoDetalhe> {
    const { codigo_lancamento, id_empresa } = lancamento;
    const lancamentoAtual = await this.repository.findOne({
      where: { codigo_lancamento, id_empresa },
    });

    return lancamentoAtual;
  }
}

export { LancamentoDetalheRepository };

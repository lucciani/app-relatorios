import { getRepository, Repository } from "typeorm";

import { IDistribuicaoContaReceberRepository } from "@modules/omie/repositories/IDistribuicaoContaReceberRepository";

import { DistribuicaoContaReceber } from "../entities/DistribuicaoContaReceber";

class DistribuicaoContaReceberRepository
  implements IDistribuicaoContaReceberRepository
{
  private repository: Repository<DistribuicaoContaReceber>;

  constructor() {
    this.repository = getRepository<DistribuicaoContaReceber>(
      DistribuicaoContaReceber
    );
  }

  async findByEmpresaIdAndCodigoOmieAndCodDep(
    distribuicao: DistribuicaoContaReceber
  ): Promise<DistribuicaoContaReceber> {
    const { codigo_lancamento_omie, id_empresa, ccoddep } = distribuicao;
    const distribuicaoAtual = await this.repository.findOne({
      where: { codigo_lancamento_omie, id_empresa, ccoddep },
    });

    return distribuicaoAtual;
  }

  async create(
    distribuicao: DistribuicaoContaReceber
  ): Promise<DistribuicaoContaReceber> {
    const dist = this.repository.create(distribuicao);
    const { id_empresa, codigo_lancamento_omie, ccoddep } = dist;

    const distribuicaoAtual = await this.findByEmpresaIdAndCodigoOmieAndCodDep(
      distribuicao
    );

    if (!distribuicaoAtual) {
      const distribuicaoNovo = await this.repository.save(dist);
      return distribuicaoNovo;
    }

    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(distribuicaoAtual)
      .returning("*")
      .where("codigo_lancamento_omie = :codigo_lancamento_omie", {
        codigo_lancamento_omie,
      })
      .andWhere("id_empresa = :id_empresa", {
        id_empresa,
      })
      .andWhere("ccoddep = :ccoddep", {
        ccoddep,
      })
      .execute();
    return objAtualizado.raw[0];
  }
}

export { DistribuicaoContaReceberRepository };

import { getRepository, Repository } from "typeorm";

import { IDistribuicaoContaPagarRepository } from "@modules/omie/repositories/IDistribuicaoContaPagarRepository";

import { DistribuicaoContaPagar } from "../entities/DistribuicaoContaPagar";

class DistribuicaoContaPagarRepository
  implements IDistribuicaoContaPagarRepository
{
  private repository: Repository<DistribuicaoContaPagar>;

  constructor() {
    this.repository = getRepository<DistribuicaoContaPagar>(
      DistribuicaoContaPagar
    );
  }

  async findByEmpresaIdAndCodigoOmieAndCodDep(
    distribuicao: DistribuicaoContaPagar
  ): Promise<DistribuicaoContaPagar> {
    const { codigo_lancamento_omie, id_empresa, ccoddep } = distribuicao;
    const distribuicaoAtual = await this.repository.findOne({
      where: { codigo_lancamento_omie, id_empresa, ccoddep },
    });

    return distribuicaoAtual;
  }

  async create(
    distribuicao: DistribuicaoContaPagar
  ): Promise<DistribuicaoContaPagar> {
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

export { DistribuicaoContaPagarRepository };

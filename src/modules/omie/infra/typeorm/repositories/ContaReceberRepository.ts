import { getRepository, Repository } from "typeorm";

import { IContaReceberDTO } from "@modules/omie/dtos/IContaReceberDTO";

import { IContaReceberRepository } from "../../../repositories/IContaReceberRepository";
import { ContaReceber } from "../entities/ContaReceber";

class ContaReceberRepository implements IContaReceberRepository {
  private repository: Repository<ContaReceber>;

  constructor() {
    this.repository = getRepository<ContaReceber>(ContaReceber);
  }
  async findByCodigoLancamento(
    codigo_lancamento_omie: number
  ): Promise<ContaReceber> {
    const contaReceberAtual = await this.repository.findOne({
      codigo_lancamento_omie,
    });
    return contaReceberAtual;
  }
  async list(): Promise<ContaReceber[]> {
    const contasReceber = await this.repository.find();
    return contasReceber;
  }
  async create(contaReceber: IContaReceberDTO): Promise<ContaReceber> {
    const cr = this.repository.create(contaReceber);
    const { codigo_lancamento_omie, id_empresa } = cr;

    const conta = await this.findByCodigoLacamentoEmpresaId(
      codigo_lancamento_omie,
      id_empresa
    );

    if (!conta) {
      const contaReceberAtual = await this.repository.save(cr);
      return contaReceberAtual;
    }

    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(conta)
      .returning("*")
      .where("id_empresa = :id_empresa", { id_empresa })
      .andWhere("codigo_lancamento_omie = :codigo_lancamento_omie", {
        codigo_lancamento_omie,
      })
      .execute();
    return objAtualizado.raw[0];
  }

  async findByCodigoLacamentoEmpresaId(
    codigo_lancamento_omie: number,
    id_empresa: number
  ): Promise<ContaReceber> {
    const conta = await this.repository.findOne({
      id_empresa,
      codigo_lancamento_omie,
    });

    return conta;
  }
}

export { ContaReceberRepository };

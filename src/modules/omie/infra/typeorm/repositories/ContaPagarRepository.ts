import { getRepository, Repository } from "typeorm";

import { IContaPagarDTO } from "@modules/omie/dtos/IContaPagarDTO";
import { IContaPagarRepository } from "@modules/omie/repositories/IContaPagarRepository";

import { ContaPagar } from "../entities/ContaPagar";

class ContaPagarRepository implements IContaPagarRepository {
  private repository: Repository<ContaPagar>;

  constructor() {
    this.repository = getRepository<ContaPagar>(ContaPagar);
  }
  async findByCodigoLancamento(
    codigo_lancamento_omie: number
  ): Promise<ContaPagar> {
    const contaPagarAtual = await this.repository.findOne({
      codigo_lancamento_omie,
    });
    return contaPagarAtual;
  }
  async list(): Promise<ContaPagar[]> {
    const contasPagar = await this.repository.find();
    return contasPagar;
  }
  async create(contaPagar: IContaPagarDTO): Promise<ContaPagar> {
    const cp = this.repository.create(contaPagar);
    const { codigo_lancamento_omie, id_empresa } = cp;

    const conta = await this.findByCodigoLacamentoEmpresaId(
      codigo_lancamento_omie,
      id_empresa
    );

    if (!conta) {
      const contaPagarAtual = await this.repository.save(cp);
      return contaPagarAtual;
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
  ): Promise<ContaPagar> {
    const conta = await this.repository.findOne({
      where: {
        id_empresa,
        codigo_lancamento_omie,
      },
    });

    return conta;
  }
}

export { ContaPagarRepository };

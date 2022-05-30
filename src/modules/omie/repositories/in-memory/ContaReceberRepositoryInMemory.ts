import { IContaReceberDTO } from "@modules/omie/dtos/IContaReceberDTO";
import { ContaReceber } from "@modules/omie/infra/typeorm/entities/ContaReceber";

import { IContaReceberRepository } from "../IContaReceberRepository";

class ContaReceberRepositoryInMemory implements IContaReceberRepository {
  contasReceber: ContaReceber[] = [];

  async findByCodigoLancamento(
    codigo_lancamento_omie: number
  ): Promise<ContaReceber> {
    const contaReceber = this.contasReceber.find(
      (contaReceber) =>
        contaReceber.codigo_lancamento_omie === codigo_lancamento_omie
    );
    return contaReceber;
  }

  async list(): Promise<ContaReceber[]> {
    const contasAReceber = this.contasReceber;
    return contasAReceber;
  }

  async create(data: IContaReceberDTO): Promise<ContaReceber> {
    const contaReceber = new ContaReceber();

    Object.assign(contaReceber, {
      data,
    });

    const conta = await this.findByCodigoLacamentoEmpresaId(
      contaReceber.codigo_lancamento_omie,
      contaReceber.ID_Empresa
    );

    if (!conta) {
      this.contasReceber.push(contaReceber);
      return contaReceber;
    }

    this.contasReceber.splice(this.contasReceber.indexOf(conta));
    this.contasReceber.push(conta);

    return conta;
  }

  async findByCodigoLacamentoEmpresaId(
    codigo_lancamento_omie: number,
    ID_Empresa: number
  ): Promise<ContaReceber> {
    const conta = this.contasReceber.find(
      (contaReceber) =>
        contaReceber.ID_Empresa === ID_Empresa &&
        contaReceber.codigo_lancamento_omie === codigo_lancamento_omie
    );

    return conta;
  }
}

export { ContaReceberRepositoryInMemory };

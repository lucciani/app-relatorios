import { DistribuicaoContaReceber } from "../infra/typeorm/entities/DistribuicaoContaReceber";

interface IDistribuicaoContaReceberRepository {
  create(
    distribuicao: DistribuicaoContaReceber
  ): Promise<DistribuicaoContaReceber>;
  findByEmpresaIdAndCodigoOmieAndCodDep(
    distribuicao: DistribuicaoContaReceber
  ): Promise<DistribuicaoContaReceber>;
}

export { IDistribuicaoContaReceberRepository };

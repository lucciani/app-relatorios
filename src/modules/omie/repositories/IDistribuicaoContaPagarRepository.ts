import { DistribuicaoContaPagar } from "../infra/typeorm/entities/DistribuicaoContaPagar";

interface IDistribuicaoContaPagarRepository {
  create(distribuicao: DistribuicaoContaPagar): Promise<DistribuicaoContaPagar>;
  findByEmpresaIdAndCodigoOmieAndCodDep(
    distribuicao: DistribuicaoContaPagar
  ): Promise<DistribuicaoContaPagar>;
}

export { IDistribuicaoContaPagarRepository };

import { IContaReceberDTO } from "../dtos/IContaReceberDTO";
import { ContaReceber } from "../infra/typeorm/entities/ContaReceber";

interface IContaReceberRepository {
  findByCodigoLancamento(codigo_lancamento_omie: number): Promise<ContaReceber>;
  list(): Promise<ContaReceber[]>;
  create(data: IContaReceberDTO): Promise<ContaReceber>;
  findByCodigoLacamentoEmpresaId(
    codigo_lancamento_omie: number,
    ID_Empresa: number
  ): Promise<ContaReceber>;
}

export { IContaReceberRepository };

import { IContaPagarDTO } from "../dtos/IContaPagarDTO";
import { ContaPagar } from "../infra/typeorm/entities/ContaPagar";

interface IContaPagarRepository {
  findByCodigoLancamento(codigo_lancamento_omie: number): Promise<ContaPagar>;
  list(): Promise<ContaPagar[]>;
  create(data: IContaPagarDTO): Promise<ContaPagar>;
  findByCodigoLacamentoEmpresaId(
    codigo_lancamento_omie: number,
    ID_Empresa: number
  ): Promise<ContaPagar>;
}

export { IContaPagarRepository };

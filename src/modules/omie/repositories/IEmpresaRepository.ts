import { IEmpresaDTO } from "../dtos/IEmpresaDTO";
import { Empresa } from "../infra/typeorm/entities/Empresa";

interface IEmpresaRepository {
  create({
    razaoSocial,
    nomeFantasia,
    cnpj,
    ie,
    apelido,
    appKey,
    appSecret,
  }: IEmpresaDTO): Promise<Empresa>;
  findByCnpj(cnpj: string): Promise<Empresa>;
  list(): Promise<Empresa[]>;
}

export { IEmpresaRepository };

import { ITokenEmpresaDTO } from "../dtos/ITokenEmpresaDTO";
import { TokenEmpresa } from "../infra/typeorm/entities/TokenEmpresa";

interface ITokenEmpresaRepository {
  create({
    appKey,
    appSecret,
    empresaId,
  }: ITokenEmpresaDTO): Promise<TokenEmpresa>;
  findByCompanyId(empresaId: number): Promise<TokenEmpresa>;
  findAll(ativo?: boolean): Promise<TokenEmpresa[]>;
}

export { ITokenEmpresaRepository };

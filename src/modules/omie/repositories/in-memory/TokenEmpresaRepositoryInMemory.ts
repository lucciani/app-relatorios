import { ITokenEmpresaDTO } from "@modules/omie/dtos/ITokenEmpresaDTO";
import { Empresa } from "@modules/omie/infra/typeorm/entities/Empresa";
import { TokenEmpresa } from "@modules/omie/infra/typeorm/entities/TokenEmpresa";

import { ITokenEmpresaRepository } from "../ITokenEmpresaRepository";

class TokenEmpresaRepositoryInMemory implements ITokenEmpresaRepository {
  tokens: TokenEmpresa[] = [];
  tokensAtivos: TokenEmpresa[] = [];
  empresas: Empresa[];

  async create({
    appKey,
    appSecret,
    empresaId,
  }: ITokenEmpresaDTO): Promise<TokenEmpresa> {
    const tokenEmpresa = new TokenEmpresa();

    Object.assign(tokenEmpresa, {
      appKey,
      appSecret,
      empresaId,
    });

    this.tokens.push(tokenEmpresa);

    return tokenEmpresa;
  }

  async findByCompanyId(empresaId: number): Promise<TokenEmpresa> {
    const tokeEmpresa = this.tokens.find(
      (token) => token.empresaId === empresaId
    );
    return tokeEmpresa;
  }

  async findAll(ativo?: boolean): Promise<TokenEmpresa[]> {
    const companies = this.empresas.filter(
      (empresa) => empresa.ativo === ativo
    );
    companies.forEach((emp) => {
      const token = this.tokens.find((token) => token.empresaId === emp.id);
      this.tokensAtivos.push(token);
    });

    return this.tokensAtivos;
  }
}

export { TokenEmpresaRepositoryInMemory };

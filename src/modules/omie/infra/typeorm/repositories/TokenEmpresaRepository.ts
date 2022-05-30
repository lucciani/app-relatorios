import { getRepository, Repository } from "typeorm";

import { ITokenEmpresaDTO } from "@modules/omie/dtos/ITokenEmpresaDTO";
import { ITokenEmpresaRepository } from "@modules/omie/repositories/ITokenEmpresaRepository";

import { TokenEmpresa } from "../entities/TokenEmpresa";

class TokenEmpresaRepository implements ITokenEmpresaRepository {
  private repository: Repository<TokenEmpresa>;

  constructor() {
    this.repository = getRepository<TokenEmpresa>(TokenEmpresa);
  }

  async create({
    appKey,
    appSecret,
    empresaId,
  }: ITokenEmpresaDTO): Promise<TokenEmpresa> {
    const tokenEMpresa = this.repository.create({
      appkey: appKey,
      appsecret: appSecret,
      empresaid: empresaId,
    });

    tokenEMpresa.created_at = new Date();

    const tokenEMpresaAtual = this.repository.save(tokenEMpresa);
    return tokenEMpresaAtual;
  }

  async findByCompanyId(empresaid: number): Promise<TokenEmpresa> {
    const tokenEmpresa = this.repository.findOne({ empresaid });
    return tokenEmpresa;
  }

  async findAll(ativo?: boolean): Promise<TokenEmpresa[]> {
    const tokensEmpresas = this.repository
      .createQueryBuilder("e")
      .innerJoin("e.company", "empresa")
      .where("empresa.ativo = :ativo", { ativo })
      .getMany();

    return tokensEmpresas;
  }
}

export { TokenEmpresaRepository };

import { getRepository, Repository } from "typeorm";

import { IEmpresaDTO } from "@modules/omie/dtos/IEmpresaDTO";
import { IEmpresaRepository } from "@modules/omie/repositories/IEmpresaRepository";

import { Empresa } from "../entities/Empresa";
import { TokenEmpresa } from "../entities/TokenEmpresa";

class EmpresaRepository implements IEmpresaRepository {
  private repository: Repository<Empresa>;
  private empresaTokenRepository: Repository<TokenEmpresa>;

  constructor() {
    this.repository = getRepository<Empresa>(Empresa);
    this.empresaTokenRepository = getRepository<TokenEmpresa>(TokenEmpresa);
  }

  async create({
    razaoSocial,
    nomeFantasia,
    cnpj,
    ie,
    apelido,
    appKey,
    appSecret,
  }: IEmpresaDTO): Promise<Empresa> {
    const empresa = this.repository.create({
      razaosocial: razaoSocial,
      nomefantasia: nomeFantasia,
      cnpj,
      ie,
      apelido,
    });

    const empresaAtual = await this.repository.save(empresa);

    const empresaToken = this.empresaTokenRepository.create({
      appkey: appKey,
      appsecret: appSecret,
      empresaid: empresaAtual.id,
    });

    await this.empresaTokenRepository.save(empresaToken);

    return empresaAtual;
  }

  async findByCnpj(cnpj: string): Promise<Empresa> {
    const empresa = await this.repository.findOne({ cnpj });
    return empresa;
  }

  async list(): Promise<Empresa[]> {
    const empresas = await this.repository.find();
    return empresas;
  }
}

export { EmpresaRepository };

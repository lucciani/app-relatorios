import { IEmpresaDTO } from "@modules/omie/dtos/IEmpresaDTO";
import { Empresa } from "@modules/omie/infra/typeorm/entities/Empresa";

import { IEmpresaRepository } from "../IEmpresaRepository";

class EmpresaRepositoryInMemory implements IEmpresaRepository {
  empresas: Empresa[] = [];

  async create({
    razaoSocial,
    nomeFantasia,
    cnpj,
    ie,
  }: IEmpresaDTO): Promise<Empresa> {
    const empresa = new Empresa();

    Object.assign(empresa, {
      razaoSocial,
      nomeFantasia,
      cnpj,
      ie,
    });

    empresa.id = Math.floor(Math.random() * 10);

    this.empresas.push(empresa);

    return empresa;
  }

  async findByCnpj(cnpj: string): Promise<Empresa> {
    const empresa = this.empresas.find((empresa) => empresa.cnpj === cnpj);
    return empresa;
  }

  async list(): Promise<Empresa[]> {
    const all = this.empresas;
    return all;
  }
}

export { EmpresaRepositoryInMemory };

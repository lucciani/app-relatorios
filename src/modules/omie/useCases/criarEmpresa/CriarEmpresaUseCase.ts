import { validateBr } from "js-brasil";
import { inject, injectable } from "tsyringe";

import { IEmpresaDTO } from "@modules/omie/dtos/IEmpresaDTO";
import { Empresa } from "@modules/omie/infra/typeorm/entities/Empresa";
import { IEmpresaRepository } from "@modules/omie/repositories/IEmpresaRepository";
import { AppError } from "@shared/errors/AppError";
import { onlyNumbers } from "@utils/regex";

@injectable()
class CriarEmpresaUseCase {
  constructor(
    @inject("EmpresaRepository")
    private companiesRepository: IEmpresaRepository
  ) {}

  async execute({
    razaoSocial,
    nomeFantasia,
    cnpj,
    ie,
    apelido,
    appKey,
    appSecret,
  }: IEmpresaDTO): Promise<Empresa> {
    const validCnpj = validateBr.cnpj(cnpj);

    if (!validCnpj) {
      throw new AppError("CNPJ Invalid!");
    }

    const treatedCnpj = onlyNumbers(cnpj);
    const inscricaoEstadual = onlyNumbers(ie);

    const companyAlreadyExists = await this.companiesRepository.findByCnpj(
      treatedCnpj
    );

    if (companyAlreadyExists) {
      throw new AppError("Empresa já cadastrada!");
    }

    const company = await this.companiesRepository.create({
      razaoSocial,
      nomeFantasia,
      cnpj: treatedCnpj,
      ie: inscricaoEstadual,
      apelido,
      appSecret,
      appKey,
    });

    return company;
  }
}

export { CriarEmpresaUseCase };

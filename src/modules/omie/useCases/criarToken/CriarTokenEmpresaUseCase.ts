import { inject, injectable } from "tsyringe";

import { ITokenEmpresaDTO } from "@modules/omie/dtos/ITokenEmpresaDTO";
import { ITokenEmpresaRepository } from "@modules/omie/repositories/ITokenEmpresaRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CriarTokenEmpresaUseCase {
  constructor(
    @inject("TokenEmpresaRepository")
    private companyTokensRepository: ITokenEmpresaRepository
  ) {}
  async execute({ appKey, appSecret, empresaId }: ITokenEmpresaDTO) {
    const companyToken = await this.companyTokensRepository.findByCompanyId(
      empresaId
    );

    if (companyToken) {
      throw new AppError("Company tokens already exists!");
    }

    const companyTokens = this.companyTokensRepository.create({
      appKey,
      appSecret,
      empresaId,
    });

    return companyTokens;
  }
}

export { CriarTokenEmpresaUseCase };

import { inject, injectable } from "tsyringe";

import { IContaReceberDTO } from "@modules/omie/dtos/IContaReceberDTO";
import { ContaReceber } from "@modules/omie/infra/typeorm/entities/ContaReceber";
import { IContaReceberRepository } from "@modules/omie/repositories/IContaReceberRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CriarContaReceberUseCase {
  constructor(
    @inject("ContaReceberRepository")
    private accountsReceiveRepository: IContaReceberRepository
  ) {}

  async execute(data: IContaReceberDTO): Promise<ContaReceber> {
    const accountReceiveAlreadyExists =
      await this.accountsReceiveRepository.findByCodigoLancamento(
        data.codigo_lancamento_omie
      );

    if (accountReceiveAlreadyExists) {
      throw new AppError("Conta a receber já existente!");
    }

    const contaReceber = await this.accountsReceiveRepository.create(data);

    return contaReceber;
  }
}

export { CriarContaReceberUseCase };

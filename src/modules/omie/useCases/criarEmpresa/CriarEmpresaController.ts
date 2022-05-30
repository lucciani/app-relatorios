import camelcaseKeys from "camelcase-keys";
import { Request, Response } from "express";
import snakecaseKeys from "snakecase-keys";
import { container } from "tsyringe";

import { CriarEmpresaUseCase } from "./CriarEmpresaUseCase";

class CriarEmpresaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { razaoSocial, nomeFantasia, cnpj, ie, appKey, appSecret } =
      camelcaseKeys(request.body);

    const CriarContaReceberUseCase = container.resolve(CriarEmpresaUseCase);

    const company = await CriarContaReceberUseCase.execute({
      razaoSocial,
      nomeFantasia,
      cnpj,
      ie,
      appKey,
      appSecret,
    });

    return response.status(201).json(snakecaseKeys(company));
  }
}

export { CriarEmpresaController };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { ContasPagarOmieServices } from "./ContasPagarOmieServices";

class ContaPagarOmieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const contasPagarOmieServices = container.resolve(ContasPagarOmieServices);

    await contasPagarOmieServices.execute();

    return response.send();
  }
}

export { ContaPagarOmieController };

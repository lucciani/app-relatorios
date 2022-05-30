import { Request, Response } from "express";
import { container } from "tsyringe";

import { MovimentoFinanceiroServices } from "./MovimentoFinanceiroServices";

class MovimentoFinanceiroController {
  async handle(request: Request, response: Response): Promise<Response> {
    const movimentoFinanceiroServices = container.resolve(
      MovimentoFinanceiroServices
    );

    await movimentoFinanceiroServices.execute();
    return response.send();
  }
}

export { MovimentoFinanceiroController };

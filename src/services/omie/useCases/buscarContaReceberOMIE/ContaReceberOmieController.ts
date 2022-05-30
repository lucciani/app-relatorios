import { Request, Response } from "express";
import { container } from "tsyringe";

import { ContasReceberOmieServices } from "./ContasReceberOmieServices";

class ContaReceberOmieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const contasReceberOmieServices = container.resolve(
      ContasReceberOmieServices
    );

    await contasReceberOmieServices.execute();

    return response.send();
  }
}

export { ContaReceberOmieController };

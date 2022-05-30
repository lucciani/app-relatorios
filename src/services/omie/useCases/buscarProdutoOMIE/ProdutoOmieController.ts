import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProdutoOmieServices } from "./ProdutoOmieServices";

class ProdutoOmieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const produtoServices = container.resolve(ProdutoOmieServices);

    await produtoServices.execute();
    return response.send();
  }
}

export { ProdutoOmieController };

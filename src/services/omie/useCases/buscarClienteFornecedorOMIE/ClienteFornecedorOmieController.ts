import { Request, Response } from "express";
import { container } from "tsyringe";

import { ClienteFornecedorOmieServices } from "./ClienteFornecedorOmieServices";

class ClienteFornecedorOmieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const clienteFornecedorServices = container.resolve(
      ClienteFornecedorOmieServices
    );

    await clienteFornecedorServices.execute();

    return response.send();
  }
}

export { ClienteFornecedorOmieController };

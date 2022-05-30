import { Request, Response } from "express";
import { container } from "tsyringe";

import { PedidoCompraOmieServices } from "./PedidoCompraOmieServices";

class PedidoCompraOmieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const pedidoCompraServices = container.resolve(PedidoCompraOmieServices);

    await pedidoCompraServices.execute();
    return response.send();
  }
}

export { PedidoCompraOmieController };

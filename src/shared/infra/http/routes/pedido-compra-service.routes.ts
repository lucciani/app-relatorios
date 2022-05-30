import { Router } from "express";

import { PedidoCompraOmieController } from "@services/omie/useCases/buscarPedidoCompraOMIE/PedidoCompraOmieController";

const pedidoCompraOmieRoutes = Router();

const pedidoCompraController = new PedidoCompraOmieController();

pedidoCompraOmieRoutes.post("/", pedidoCompraController.handle);

export { pedidoCompraOmieRoutes };

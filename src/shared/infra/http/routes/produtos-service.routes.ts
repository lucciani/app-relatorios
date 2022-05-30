import { Router } from "express";

import { ProdutoOmieController } from "@services/omie/useCases/buscarProdutoOMIE/ProdutoOmieController";

const produtoOmieRoutes = Router();

const produtoController = new ProdutoOmieController();

produtoOmieRoutes.post("/", produtoController.handle);

export { produtoOmieRoutes };

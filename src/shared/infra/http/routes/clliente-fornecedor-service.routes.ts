import { Router } from "express";

import { ClienteFornecedorOmieController } from "@services/omie/useCases/buscarClienteFornecedorOMIE/ClienteFornecedorOmieController";

const clienteFornecedorOmieRoutes = Router();

const clienteFornecedorController = new ClienteFornecedorOmieController();

clienteFornecedorOmieRoutes.post("/", clienteFornecedorController.handle);

export { clienteFornecedorOmieRoutes };

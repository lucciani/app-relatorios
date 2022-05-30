import { Router } from "express";

import { ListarTagsClienteOmieController } from "@services/omie/useCases/buscarTagsClienteOMIE/ListarTagsClienteOmieController";

const tagsClientesOmieRoutes = Router();

const tagsClienteController = new ListarTagsClienteOmieController();

tagsClientesOmieRoutes.post("/", tagsClienteController.handle);

export { tagsClientesOmieRoutes };

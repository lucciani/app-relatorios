import { Router } from "express";

import { ContaPagarOmieController } from "@services/omie/useCases/buscarContaPagarOMIE/ContaPagarOmieController";

const contasPagarOmieRoutes = Router();

const createCompanyController = new ContaPagarOmieController();

contasPagarOmieRoutes.post("/", createCompanyController.handle);

export { contasPagarOmieRoutes };

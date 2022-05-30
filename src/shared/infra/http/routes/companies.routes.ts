import { Router } from "express";

import { CriarEmpresaController } from "@modules/omie/useCases/criarEmpresa/CriarEmpresaController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const companiesRoutes = Router();

const createCompanyController = new CriarEmpresaController();

companiesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCompanyController.handle
);

export { companiesRoutes };

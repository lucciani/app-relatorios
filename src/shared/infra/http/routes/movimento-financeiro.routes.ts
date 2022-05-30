import { Router } from "express";

import { MovimentoFinanceiroController } from "@services/omie/useCases/buscarMovimentoFinanceiroOMIE/MovimentoFinanceiroController";

const movimentoFinanceiroOmieRoutes = Router();

const movimentoFinanceiroController = new MovimentoFinanceiroController();

movimentoFinanceiroOmieRoutes.post("/", movimentoFinanceiroController.handle);

export { movimentoFinanceiroOmieRoutes };

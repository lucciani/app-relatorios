import { Router } from "express";

import { AlterarContaReceberController } from "@services/omie/useCases/alterarContaReceberOMIE/AlterarContaReceberController";
import { ContaReceberOmieController } from "@services/omie/useCases/buscarContaReceberOMIE/ContaReceberOmieController";
import { ExcluirContaReceberController } from "@services/omie/useCases/excluirContaReceberOMIE/ExcluirContaReceberController";
import { IncluirContaReceberController } from "@services/omie/useCases/incluirContaReceberOMIE/IncluirContaReceberController";
import { LancarRecebimentooController } from "@services/omie/useCases/lancarRecebimentoOmie/LancarRecebimentoController";

const contasReceberOmieRoutes = Router();

const createCompanyController = new ContaReceberOmieController();
const lancarRecebimentoController = new LancarRecebimentooController();
const alterarContaReceberController = new AlterarContaReceberController();
const excluirContaReceberController = new ExcluirContaReceberController();
const incluirContaReceberController = new IncluirContaReceberController();

contasReceberOmieRoutes.post("/", createCompanyController.handle);
contasReceberOmieRoutes.post(
  "/lancar-recebimentos/empresas/:id_empresa",
  lancarRecebimentoController.handleSisParceria
);
contasReceberOmieRoutes.post(
  "/alterar/empresas/:id_empresa",
  alterarContaReceberController.handleUpdate
);
contasReceberOmieRoutes.post(
  "/excluir/empresas/:id_empresa",
  excluirContaReceberController.handleRemove
);
contasReceberOmieRoutes.post(
  "/incluir/empresas/:id_empresa",
  incluirContaReceberController.handleIncluir
);

export { contasReceberOmieRoutes };

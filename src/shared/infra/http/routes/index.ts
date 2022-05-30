import { Router } from "express";

import { accountsReceiveRoutes } from "./accounts-receive.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { clienteFornecedorOmieRoutes } from "./clliente-fornecedor-service.routes";
import { companiesRoutes } from "./companies.routes";
import { contasPagarOmieRoutes } from "./conta-pagar-service.routes";
import { contasReceberOmieRoutes } from "./conta-receber-service.routes";
import { movimentoFinanceiroOmieRoutes } from "./movimento-financeiro.routes";
import { passawordRoutes } from "./password.routes";
import { pedidoCompraOmieRoutes } from "./pedido-compra-service.routes";
import { produtoOmieRoutes } from "./produtos-service.routes";
import { tagsClientesOmieRoutes } from "./tags-cliente-service.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/empresas", companiesRoutes);
router.use("/accounts-receive", accountsReceiveRoutes);
router.use("/users", usersRoutes);
router.use("/password", passawordRoutes);
router.use("/contas-receber", contasReceberOmieRoutes);
router.use("/tags", tagsClientesOmieRoutes);
router.use("/contas-pagar", contasPagarOmieRoutes);
router.use("/cliente-fornecedor", clienteFornecedorOmieRoutes);
router.use("/pedido-compra", pedidoCompraOmieRoutes);
router.use("/produtos", produtoOmieRoutes);
router.use("/movimento-financeiro", movimentoFinanceiroOmieRoutes);
router.use(authenticateRoutes);

export { router };

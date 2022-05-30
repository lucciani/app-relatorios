import { Router } from "express";
import multer from "multer";

import { CriarContaReceberController } from "@modules/omie/useCases/criarContaReceber/CriarContaReceberController";
import { ImportAccountReceiveController } from "@modules/omie/useCases/importAccountReceive/ImportAccountReceiveController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const accountsReceiveRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const criarContaReceberController = new CriarContaReceberController();
const importAccountReceiveController = new ImportAccountReceiveController();

// accountsReceiveRoutes.use(ensureAuthenticated);
accountsReceiveRoutes.post("/", criarContaReceberController.handle);

accountsReceiveRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  importAccountReceiveController.handle
);

export { accountsReceiveRoutes };

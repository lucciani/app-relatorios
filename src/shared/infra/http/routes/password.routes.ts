import { Router } from "express";

import { ResetPasswordUserController } from "@modules/accounts/userCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/userCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passawordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passawordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passawordRoutes.post("/reset", resetPasswordUserController.handle);

export { passawordRoutes };

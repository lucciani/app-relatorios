import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/userCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/userCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };

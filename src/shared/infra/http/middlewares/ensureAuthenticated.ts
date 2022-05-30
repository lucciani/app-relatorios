import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { secret_token } = auth;
  const authHeader = request.headers.authorization;

  // const userTokenRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, secret_token) as IPayload;

    // const user = userTokenRepository.findByUserIdAndRefreshToken(
    //   user_id,
    //   token
    // );

    // if (!user) {
    //   throw new AppError("User does not exists!", 401);
    // }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}

import { NextFunction, Request, Response } from "express";

import { UnauthorizedError } from "../errors/unauthorized-error";
import { tokenService } from "../../modules/auth/token/token.service";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(
      new UnauthorizedError("Authentication required")
    );
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(
      new UnauthorizedError("Invalid authorization header")
    );
  }

  const payload = await tokenService.verifyAccessToken(token);

  req.user = payload;

  next();
}
import type { AccessTokenPayload } from "../modules/auth/token/types";

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

export {};
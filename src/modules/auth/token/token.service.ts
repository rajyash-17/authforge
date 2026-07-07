import {
  jwtVerify,
  SignJWT,
} from "jose";

import {
  ACCESS_TOKEN_TTL,
  AUDIENCE,
  ISSUER,
  JWT_ALGORITHM,
} from "../../../core/constants/auth";

import { keyService } from "./key.service";
import type { AccessTokenPayload } from "./types";

class TokenService {
  async signAccessToken(
    payload: AccessTokenPayload
  ) {
    const privateKey =
      await keyService.getPrivateKey();

    return await new SignJWT({
      email: payload.email,
    })
      .setProtectedHeader({
        alg: JWT_ALGORITHM,
      })
      .setSubject(payload.sub)
      .setIssuer(ISSUER)
      .setAudience(AUDIENCE)
      .setIssuedAt()
      .setExpirationTime(
        ACCESS_TOKEN_TTL
      )
      .sign(privateKey);
  }

  async verifyAccessToken(
        token: string
        ): Promise<AccessTokenPayload> {
    const publicKey =
      await keyService.getPublicKey();

    const { payload } =
      await jwtVerify(
        token,
        publicKey,
        {
          issuer: ISSUER,
          audience: AUDIENCE,
        }
      );

    return payload as AccessTokenPayload;
  }
}

export const tokenService =
  new TokenService();
import { JWTPayload } from "jose";

export interface AccessTokenPayload extends JWTPayload {
  sub: string;
  email: string;
}
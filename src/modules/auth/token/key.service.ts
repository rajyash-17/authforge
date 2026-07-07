import { readFile } from "fs/promises";
import path from "path";

import { importPKCS8, importSPKI } from "jose";

import { JWT_ALGORITHM } from "../../../core/constants/auth";

class KeyService {
  private privateKey: CryptoKey | null = null;
  private publicKey: CryptoKey | null = null;

  async getPrivateKey(): Promise<CryptoKey> {
    if (this.privateKey) {
      return this.privateKey;
    }

    const pem = await readFile(
      path.join(process.cwd(), "keys", "private.pem"),
      "utf8"
    );

    this.privateKey = await importPKCS8(
      pem,
      JWT_ALGORITHM
    );

    return this.privateKey;
  }

  async getPublicKey(): Promise<CryptoKey> {
    if (this.publicKey) {
      return this.publicKey;
    }

    const pem = await readFile(
      path.join(process.cwd(), "keys", "public.pem"),
      "utf8"
    );

    this.publicKey = await importSPKI(
      pem,
      JWT_ALGORITHM
    );

    return this.publicKey;
  }
}

export const keyService = new KeyService();
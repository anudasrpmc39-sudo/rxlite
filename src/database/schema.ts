import type { AppData } from "../types";
export const DB_NAME = "rxlite-local";
export const DB_VERSION = 1;
export type EncryptedVaultRecord = {
  id: "main"; salt: string; iv: string; ciphertext: string; updatedAt: string;
};
export type VaultPayload = AppData;

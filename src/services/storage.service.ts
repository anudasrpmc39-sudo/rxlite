import { db } from "../database/db";
import type { AppData } from "../types";
import { emptyDoctor, emptySettings } from "../types";
import { decryptObject, encryptObject } from "./encryption.service";

const VAULT_ID = "main";
export async function vaultExists(): Promise<boolean> {
  return Boolean(await db.vault.get(VAULT_ID));
}
export async function createVault(password: string): Promise<AppData> {
  if (await vaultExists()) throw new Error("A local vault already exists.");
  const data: AppData = { doctor: emptyDoctor, patients: [], medicines: [], prescriptions: [], settings: emptySettings };
  await saveVault(data, password);
  return data;
}
export async function unlockVault(password: string): Promise<AppData> {
  const record = await db.vault.get(VAULT_ID);
  if (!record) throw new Error("No local vault found.");
  try { return await decryptObject<AppData>(record, password); }
  catch { throw new Error("Incorrect password or damaged local data."); }
}
export async function saveVault(data: AppData, password: string): Promise<void> {
  const encrypted = await encryptObject(data, password);
  await db.vault.put({ id: VAULT_ID, ...encrypted, updatedAt: new Date().toISOString() });
}
export async function deleteVault(): Promise<void> {
  await db.vault.delete(VAULT_ID);
}

import type { AppData } from "../types";
import { encryptObject, decryptObject } from "./encryption.service";
const BACKUP_FORMAT = "rxlite-encrypted-backup";
export async function exportBackup(data: AppData, password: string): Promise<void> {
  const encrypted = await encryptObject(data, password);
  const blob = new Blob([JSON.stringify({ format: BACKUP_FORMAT, version: 1, createdAt: new Date().toISOString(), ...encrypted }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = `rxlite-backup-${new Date().toISOString().slice(0,10)}.json`; a.click();
  URL.revokeObjectURL(url);
}
export async function importBackup(file: File, password: string): Promise<AppData> {
  const parsed = JSON.parse(await file.text());
  if (parsed.format !== BACKUP_FORMAT || parsed.version !== 1) throw new Error("Unsupported backup format.");
  return decryptObject<AppData>(parsed, password);
}

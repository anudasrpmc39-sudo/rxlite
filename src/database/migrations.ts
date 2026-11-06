import { db } from "./db";
/** Run database opening/migrations before using the vault. Future schema changes belong here. */
export async function runMigrations(): Promise<void> {
  await db.open();
}

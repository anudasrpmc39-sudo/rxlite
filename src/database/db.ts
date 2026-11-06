import Dexie, { type Table } from "dexie";
import type { EncryptedVaultRecord } from "./schema";
import { DB_NAME } from "./schema";

class RxLiteDatabase extends Dexie {
  vault!: Table<EncryptedVaultRecord, string>;
  constructor() {
    super(DB_NAME);
    this.version(1).stores({ vault: "id, updatedAt" });
  }
}
export const db = new RxLiteDatabase();

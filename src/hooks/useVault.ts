import { useCallback, useEffect, useState } from "react";
import type { AppData } from "../types";
import { createVault, saveVault, unlockVault, vaultExists } from "../services/storage.service";
import { runMigrations } from "../database/migrations";

export function useVault() {
  const [data, setData] = useState<AppData | null>(null);
  const [password, setPassword] = useState("");
  const [exists, setExists] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { runMigrations().then(() => vaultExists()).then(setExists).catch(e => setError(String(e))).finally(() => setBusy(false)); }, []);
  const setup = useCallback(async (pass: string) => {
    setError(""); setBusy(true);
    try { const d = await createVault(pass); setPassword(pass); setData(d); setExists(true); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not create vault."); }
    finally { setBusy(false); }
  }, []);
  const unlock = useCallback(async (pass: string) => {
    setError(""); setBusy(true);
    try { const d = await unlockVault(pass); setPassword(pass); setData(d); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not unlock vault."); }
    finally { setBusy(false); }
  }, []);
  const update = useCallback(async (next: AppData) => {
    if (!password) throw new Error("Vault is locked.");
    await saveVault(next, password); setData(next);
  }, [password]);
  const lock = useCallback(() => { setData(null); setPassword(""); }, []);
  return { data, exists, busy, error, setup, unlock, update, lock };
}

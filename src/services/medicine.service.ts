import type { Medicine } from "../types";
export function searchMedicines(items: Medicine[], query: string): Medicine[] {
  const q = query.trim().toLowerCase();
  if (!q) return items.slice(0, 30);
  return items.filter(m => [m.genericName, m.brandName, m.strength, m.dosageForm, m.manufacturer]
    .some(v => v.toLowerCase().includes(q))).slice(0, 50);
}

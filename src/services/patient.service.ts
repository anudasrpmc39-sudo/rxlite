import type { Patient, AppData } from "../types";
export function searchPatients(patients: Patient[], query: string): Patient[] {
  const q = query.trim().toLocaleLowerCase();
  if (!q) return patients;
  return patients.filter(p => [p.name, p.id, p.phone].some(v => v.toLocaleLowerCase().includes(q)));
}
export function upsertPatient(data: AppData, patient: Patient): AppData {
  const exists = data.patients.some(p => p.id === patient.id);
  return { ...data, patients: exists
    ? data.patients.map(p => p.id === patient.id ? patient : p)
    : [patient, ...data.patients] };
}

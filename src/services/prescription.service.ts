import type { AppData, Prescription, PrescriptionItem } from "../types";
export function savePrescription(data: AppData, prescription: Prescription): AppData {
  const existing = data.prescriptions.find(p => p.id === prescription.id);
  return { ...data, prescriptions: existing
    ? data.prescriptions.map(p => p.id === prescription.id ? prescription : p)
    : [prescription, ...data.prescriptions] };
}
export function newPrescription(patientId: string, doctorId: string, layout: "traditional" | "modern"): Prescription {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(), patientId, doctorId, date: new Date().toISOString().slice(0, 10),
    diagnosis: "", clinicalNotes: "", vitals: "", advice: "", followUp: "",
    layout, status: "draft", items: [], createdAt: now, updatedAt: now, version: 1, amendmentNote: ""
  };
}
export function blankItem(): PrescriptionItem {
  return { id: crypto.randomUUID(), medicineName: "", genericName: "", strength: "",
    dosageForm: "", dose: "", route: "Oral", frequency: "", duration: "",
    quantity: "", instructions: "" };
}

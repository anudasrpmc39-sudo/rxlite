export type Sex = "Female" | "Male" | "Other" | "Not recorded";
export type DoctorProfile = {
  id: string; name: string; title: string; qualifications: string; speciality: string;
  bmdcNumber: string; chamberName: string; chamberAddress: string; phone: string;
  email: string; signatureText: string;
};
export type Patient = {
  id: string; name: string; dob: string; ageText: string; sex: Sex; phone: string;
  address: string; weightKg: string; allergies: string; conditions: string;
  currentMedicines: string; createdAt: string; updatedAt: string;
};
export type Medicine = {
  id: string; genericName: string; brandName: string; strength: string;
  dosageForm: string; manufacturer: string; route: string; source: "catalogue" | "custom";
  verified: boolean;
};
export type PrescriptionItem = {
  id: string; medicineId?: string; medicineName: string; genericName: string;
  strength: string; dosageForm: string; dose: string; route: string;
  frequency: string; duration: string; quantity: string; instructions: string;
};
export type Prescription = {
  id: string; patientId: string; doctorId: string; date: string;
  diagnosis: string; clinicalNotes: string; vitals: string; advice: string;
  followUp: string; layout: "traditional" | "modern"; status: "draft" | "issued";
  items: PrescriptionItem[]; createdAt: string; updatedAt: string;
  version: number; amendmentNote: string;
};
export type AppSettings = { language: "en" | "bn"; defaultLayout: "traditional" | "modern"; lockMinutes: number };
export type AppData = {
  doctor: DoctorProfile; patients: Patient[]; medicines: Medicine[];
  prescriptions: Prescription[]; settings: AppSettings;
};
export const emptyDoctor: DoctorProfile = {
  id: "doctor-default", name: "", title: "Dr.", qualifications: "MBBS",
  speciality: "", bmdcNumber: "", chamberName: "", chamberAddress: "",
  phone: "", email: "", signatureText: ""
};
export const emptySettings: AppSettings = { language: "en", defaultLayout: "traditional", lockMinutes: 5 };

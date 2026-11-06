import { z } from "zod";
export const patientSchema = z.object({
  name: z.string().trim().min(1, "Patient name is required."),
  phone: z.string().optional(),
  dob: z.string().optional()
});
export const medicineSchema = z.object({
  medicineName: z.string().trim().min(1, "Medicine name is required."),
  strength: z.string().trim().min(1, "Strength is required."),
  dose: z.string().trim().min(1, "Dose is required."),
  route: z.string().trim().min(1, "Route is required."),
  frequency: z.string().trim().min(1, "Frequency is required."),
  duration: z.string().trim().min(1, "Duration is required.")
});

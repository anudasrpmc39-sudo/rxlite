import type { DoctorProfile, Patient, Prescription } from "../../types";
import { formatDate, ageFromDob } from "../../utils/format";
export default function PrescriptionDocument({doctor,patient,prescription}:{doctor:DoctorProfile;patient:Patient;prescription:Prescription}) {
  const traditional=prescription.layout==="traditional";
  return <article className={`prescription-paper ${traditional?"traditional":"modern"}`}>
    <header className="rx-doc-header"><div><h1>{doctor.name || "Doctor name"}</h1><p>{[doctor.title,doctor.qualifications,doctor.speciality].filter(Boolean).join(" · ")}</p><p>{doctor.chamberName}</p><p>{doctor.chamberAddress}</p><p>{doctor.phone}{doctor.email?` · ${doctor.email}`:""}</p></div><div className="doctor-reg">BMDC Reg. No.<br/><b>{doctor.bmdcNumber || "Not provided"}</b></div></header>
    <div className="rx-rule"/>
    <div className="rx-patient"><div><b>Patient:</b> {patient.name}</div><div><b>Age:</b> {patient.dob?ageFromDob(patient.dob):patient.ageText || "—"}</div><div><b>Sex:</b> {patient.sex}</div><div><b>Date:</b> {formatDate(prescription.date)}</div><div><b>ID:</b> {patient.id}</div><div><b>Weight:</b> {patient.weightKg?`${patient.weightKg} kg`:"—"}</div></div>
    {(patient.allergies || patient.conditions) && <div className="clinical-strip">{patient.allergies&&<p><b>Allergies:</b> {patient.allergies}</p>}{patient.conditions&&<p><b>Relevant history:</b> {patient.conditions}</p>}</div>}
    {prescription.diagnosis&&<p className="rx-diagnosis"><b>Clinical impression:</b> {prescription.diagnosis}</p>}
    {traditional?<h2 className="rx-symbol">℞</h2>:<h2 className="section-title">MEDICATIONS</h2>}
    <div className="rx-items">{prescription.items.map((item,i)=><div className="rx-item" key={item.id}><div className="rx-item-name"><b>{i+1}. {item.medicineName}</b> {item.strength} {item.dosageForm}</div>{item.genericName&&<div className="rx-generic">{item.genericName}</div>}<div className="rx-instructions"><span><b>Dose:</b> {item.dose}</span><span><b>Route:</b> {item.route}</span><span><b>Frequency:</b> {item.frequency}</span><span><b>Duration:</b> {item.duration}</span>{item.quantity&&<span><b>Qty:</b> {item.quantity}</span>}</div>{item.instructions&&<p className="rx-note">{item.instructions}</p>}</div>)}</div>
    {prescription.vitals&&<p><b>Vitals:</b> {prescription.vitals}</p>}
    {prescription.clinicalNotes&&<p><b>Clinical notes:</b> {prescription.clinicalNotes}</p>}
    {prescription.advice&&<section className="rx-advice"><b>Advice:</b><p>{prescription.advice}</p></section>}
    {prescription.followUp&&<section className="rx-advice"><b>Follow-up:</b><p>{prescription.followUp}</p></section>}
    <footer className="rx-signature"><div><span>{doctor.signatureText || " "}</span><div className="signature-line"/><b>{doctor.name || "Doctor name"}</b><small>{doctor.qualifications} · BMDC: {doctor.bmdcNumber || "—"}</small></div></footer>
    <div className="rx-doc-footer">Generated using RxLite · This prescription must be reviewed and authorized by the prescribing practitioner.</div>
  </article>;
}

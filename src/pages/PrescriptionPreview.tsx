import { Link, useParams } from "react-router-dom";
import type { AppData } from "../types";
import PrescriptionDocument from "../components/prescription/PrescriptionDocument";
export default function PrescriptionPreview({data}:{data:AppData}) {
  const {id}=useParams();const rx=data.prescriptions.find(p=>p.id===id);const patient=rx&&data.patients.find(p=>p.id===rx.patientId);
  if(!rx||!patient)return <div className="content-card"><h2>Prescription not found</h2><Link to="/patients">Back</Link></div>;
  return <div className="preview-page"><div className="page-heading no-print"><div><p className="eyebrow">PRESCRIPTION PREVIEW</p><h1>Review prescription</h1><p className="muted">Check all details before printing or saving as PDF.</p></div><div className="heading-actions"><Link className="button secondary" to={`/prescription/${patient.id}/${rx.id}`}>Edit</Link><button className="button primary" onClick={()=>window.print()}>Print / Save PDF</button></div></div><div className="paper-wrap"><PrescriptionDocument doctor={data.doctor} patient={patient} prescription={rx}/></div></div>;
}

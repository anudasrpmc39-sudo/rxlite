import { Link, useParams } from "react-router-dom";
import type { AppData } from "../types";
import { formatDate } from "../utils/format";
export default function PatientDetails({data}:{data:AppData}) {
  const {id}=useParams(); const p=data.patients.find(x=>x.id===id);
  if(!p)return <div className="content-card"><h2>Patient not found</h2><Link to="/patients">Back to patients</Link></div>;
  const history=data.prescriptions.filter(x=>x.patientId===p.id);
  return <div><div className="page-heading"><div><p className="eyebrow">PATIENT RECORD</p><h1>{p.name}</h1><p className="muted">{p.id} · {p.phone||"No phone recorded"}</p></div><Link className="button primary" to={`/prescription/new/${p.id}`}>New prescription</Link></div>
    <div className="content-card"><h2>Patient information</h2><div className="detail-grid"><div><small>Date of birth / age</small><b>{p.dob||p.ageText||"—"}</b></div><div><small>Sex</small><b>{p.sex}</b></div><div><small>Weight</small><b>{p.weightKg?`${p.weightKg} kg`:"—"}</b></div><div><small>Address</small><b>{p.address||"—"}</b></div></div>
      <div className="clinical-strip"><p><b>Allergies:</b> {p.allergies||"Not recorded"}</p><p><b>Conditions:</b> {p.conditions||"Not recorded"}</p><p><b>Current medicines:</b> {p.currentMedicines||"Not recorded"}</p></div>
    </div>
    <div className="content-card"><h2>Prescription history</h2>{history.length===0?<p className="muted">No prescriptions recorded.</p>:<div className="table-wrap"><table><thead><tr><th>Date</th><th>Diagnosis</th><th>Medicines</th><th>Status</th></tr></thead><tbody>{history.map(h=><tr key={h.id}><td>{formatDate(h.date)}</td><td>{h.diagnosis||"—"}</td><td>{h.items.length}</td><td>{h.status}</td></tr>)}</tbody></table></div>}</div>
  </div>;
}

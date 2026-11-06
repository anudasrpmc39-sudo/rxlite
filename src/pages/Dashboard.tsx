import { Link } from "react-router-dom";
import { FilePlus2, Users, Pill, ClipboardList, ArrowRight } from "lucide-react";
import type { AppData } from "../types";
export default function Dashboard({data}:{data:AppData}) {
  const today=new Date().toISOString().slice(0,10);
  const todayCount=data.prescriptions.filter(p=>p.date===today).length;
  return <div>
    <div className="page-heading"><div><p className="eyebrow">WORKSPACE</p><h1>Good day, {data.doctor.name?data.doctor.name.replace(/^Dr\.?\s*/i,""):"Doctor"}</h1><p className="muted">Create and manage patient prescriptions in your local workspace.</p></div><Link className="button primary" to="/patients"><FilePlus2 size={17}/> New prescription</Link></div>
    <div className="stat-grid"><div className="stat-card"><Users/><span>Patients</span><b>{data.patients.length}</b></div><div className="stat-card"><ClipboardList/><span>Prescriptions</span><b>{data.prescriptions.length}</b></div><div className="stat-card"><FilePlus2/><span>Today's prescriptions</span><b>{todayCount}</b></div><div className="stat-card"><Pill/><span>Catalogue entries</span><b>{data.medicines.length}</b></div></div>
    <div className="content-card"><div className="card-heading"><div><h2>Recent prescriptions</h2><p className="muted">Your latest locally saved records</p></div><Link to="/patients" className="text-button">Patients <ArrowRight size={15}/></Link></div>
      {data.prescriptions.length===0?<div className="empty-state"><ClipboardList size={32}/><h3>No prescriptions yet</h3><p>Register or select a patient to create the first prescription.</p><Link className="button primary" to="/patients">Go to patients</Link></div>:<div className="table-wrap"><table><thead><tr><th>Date</th><th>Patient</th><th>Diagnosis</th><th>Status</th></tr></thead><tbody>{data.prescriptions.slice(0,8).map(p=><tr key={p.id}><td>{p.date}</td><td>{data.patients.find(x=>x.id===p.patientId)?.name||"Patient unavailable"}</td><td>{p.diagnosis||"—"}</td><td><span className="tag">{p.status}</span></td></tr>)}</tbody></table></div>}
    </div>
    <p className="notice"><b>Privacy reminder:</b> Patient data is stored in this browser profile. Export encrypted backups regularly. Do not use a shared device without protecting access.</p>
  </div>;
}

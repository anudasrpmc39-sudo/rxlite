import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, UserRound, FilePlus2 } from "lucide-react";
import type { AppData, Patient } from "../types";
import { searchPatients, upsertPatient } from "../services/patient.service";
import PatientForm from "../components/patient/PatientForm";
export default function Patients({data,onChange}:{data:AppData;onChange:(d:AppData)=>Promise<void>}) {
  const [query,setQuery]=useState(""); const [adding,setAdding]=useState(false); const [editing,setEditing]=useState<Patient|undefined>();
  const list=useMemo(()=>searchPatients(data.patients,query),[data.patients,query]);
  async function save(p:Patient){await onChange(upsertPatient(data,p));setAdding(false);setEditing(undefined);}
  return <div><div className="page-heading"><div><p className="eyebrow">PATIENT MANAGEMENT</p><h1>Patients</h1><p className="muted">Register and find patients stored on this device.</p></div><button className="button primary" onClick={()=>{setAdding(true);setEditing(undefined);}}><Plus size={17}/> Add patient</button></div>
    <div className="search-bar"><Search size={18}/><input placeholder="Search by patient name, ID or phone..." value={query} onChange={e=>setQuery(e.target.value)}/></div>
    {(adding||editing)&&<div className="content-card"><div className="card-heading"><h2>{editing?"Edit patient":"New patient"}</h2></div><PatientForm initial={editing} onSave={save} onCancel={()=>{setAdding(false);setEditing(undefined);}}/></div>}
    <div className="content-card"><div className="card-heading"><h2>Patient directory</h2><span className="tag">{list.length} records</span></div>
      {list.length===0?<div className="empty-state"><UserRound size={32}/><h3>No patients found</h3><p>Add a patient or change your search.</p></div>:<div className="table-wrap"><table><thead><tr><th>Patient</th><th>Patient ID</th><th>Phone</th><th>Sex</th><th>Actions</th></tr></thead><tbody>{list.map(p=><tr key={p.id}><td><b>{p.name}</b></td><td>{p.id}</td><td>{p.phone||"—"}</td><td>{p.sex}</td><td><div className="table-actions"><button className="text-button" onClick={()=>{setEditing(p);setAdding(false);}}>Edit</button><Link className="text-button" to={`/patients/${p.id}`}>View / prescribe</Link><Link className="icon-link" title="New prescription" to={`/prescription/new/${p.id}`}><FilePlus2 size={17}/></Link></div></td></tr>)}</tbody></table></div>}
    </div>
  </div>;
}

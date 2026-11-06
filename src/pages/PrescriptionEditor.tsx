import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Plus, Eye, Save } from "lucide-react";
import type { AppData, Prescription, PrescriptionItem } from "../types";
import { blankItem, newPrescription, savePrescription } from "../services/prescription.service";
import { uid } from "../utils/format";
import { Field, TextArea } from "../components/common/Field";
import MedicinePicker from "../components/medicine/MedicinePicker";
import MedicineItemForm from "../components/prescription/MedicineItemForm";
import { medicineSchema } from "../utils/validation";
export default function PrescriptionEditor({data,onChange}:{data:AppData;onChange:(d:AppData)=>Promise<void>}) {
  const {patientId,prescriptionId}=useParams(); const navigate=useNavigate();
  const patient=data.patients.find(p=>p.id===patientId);
  const existing=data.prescriptions.find(p=>p.id===prescriptionId);
  const [rx,setRx]=useState<Prescription>(()=>existing?structuredClone(existing):newPrescription(patientId||"",data.doctor.id,data.settings.defaultLayout));
  const [error,setError]=useState("");
  useEffect(()=>{if(existing)setRx(structuredClone(existing));},[existing?.id]);
  if(!patient)return <div className="content-card"><h2>Patient not found</h2><Link to="/patients">Return to patients</Link></div>;
  const updateItem=(id:string,item:PrescriptionItem)=>setRx(old=>({...old,items:old.items.map(x=>x.id===id?item:x)}));
  function chooseMedicine(m:{id:string;genericName:string;brandName:string;strength:string;dosageForm:string;route:string}) {
    const item=blankItem(); item.medicineId=m.id; item.medicineName=m.brandName||m.genericName;item.genericName=m.genericName;item.strength=m.strength;item.dosageForm=m.dosageForm;item.route=m.route||"Oral";
    setRx(old=>({...old,items:[...old.items,item]}));
  }
  async function save(status:"draft"|"issued"="draft") {
    setError("");
    if(!rx.items.length){setError("Add at least one medicine.");return;}
    for(const item of rx.items){const result=medicineSchema.safeParse(item);if(!result.success){setError(`${item.medicineName||"Medicine"}: ${result.error.issues[0].message}`);return;}}
    if(!data.doctor.name||!data.doctor.bmdcNumber){setError("Complete the doctor name and BMDC registration number in Settings before issuing.");return;}
    const next={...rx,status,updatedAt:new Date().toISOString(),version:existing?existing.version+1:1};
    await onChange(savePrescription(data,next));navigate(`/prescription/preview/${next.id}`);
  }
  return <div><div className="page-heading"><div><p className="eyebrow">PRESCRIPTION EDITOR</p><h1>{existing?"Edit prescription":"New prescription"}</h1><p className="muted">Patient: <b>{patient.name}</b> · {patient.id}</p></div><Link className="button secondary" to={`/patients/${patient.id}`}>Patient record</Link></div>
    {patient.allergies&&<div className="warning"><b>Recorded allergies:</b> {patient.allergies}. Verify this information before prescribing.</div>}
    {error&&<div className="error-box">{error}</div>}
    <div className="content-card"><h2>Clinical information</h2><div className="form-grid"><Field label="Prescription date" type="date" value={rx.date} onChange={e=>setRx({...rx,date:e.target.value})}/><Field label="Clinical impression / diagnosis" value={rx.diagnosis} onChange={e=>setRx({...rx,diagnosis:e.target.value})}/><div className="full"><TextArea label="Clinical notes" rows={2} value={rx.clinicalNotes} onChange={e=>setRx({...rx,clinicalNotes:e.target.value})}/></div><div className="full"><Field label="Vitals (optional)" value={rx.vitals} onChange={e=>setRx({...rx,vitals:e.target.value})} placeholder="e.g. BP, pulse, temperature, SpO₂"/></div></div></div>
    <div className="content-card"><div className="card-heading"><div><h2>Medicines</h2><p className="muted">Search the catalogue or enter a medicine manually.</p></div><button className="button secondary" onClick={()=>setRx(old=>({...old,items:[...old.items,blankItem()]}))}><Plus size={16}/> Manual medicine</button></div>
      <MedicinePicker catalogue={data.medicines} onChoose={chooseMedicine} onCustom={()=>setRx(old=>({...old,items:[...old.items,blankItem()]}))}/>
      {rx.items.length===0?<div className="empty-state compact-empty"><p>No medicines added yet.</p></div>:rx.items.map(item=><MedicineItemForm key={item.id} item={item} onChange={v=>updateItem(item.id,v)} onRemove={()=>setRx(old=>({...old,items:old.items.filter(x=>x.id!==item.id)}))}/>)}
    </div>
    <div className="content-card"><h2>Advice and follow-up</h2><div className="form-grid"><div className="full"><TextArea label="General advice" rows={3} value={rx.advice} onChange={e=>setRx({...rx,advice:e.target.value})}/></div><div className="full"><TextArea label="Follow-up instructions" rows={2} value={rx.followUp} onChange={e=>setRx({...rx,followUp:e.target.value})}/></div><label className="field"><span>Prescription layout</span><select value={rx.layout} onChange={e=>setRx({...rx,layout:e.target.value as Prescription["layout"]})}><option value="traditional">Traditional Rx</option><option value="modern">Modern structured</option></select></label></div></div>
    <div className="editor-actions"><button className="button secondary" onClick={()=>save("draft")}><Save size={16}/> Save draft & preview</button><button className="button primary" onClick={()=>save("issued")}><Eye size={16}/> Review & issue</button></div>
    <p className="muted tiny">The prescribing practitioner is responsible for checking every medicine and instruction. RxLite does not validate clinical appropriateness.</p>
  </div>;
}

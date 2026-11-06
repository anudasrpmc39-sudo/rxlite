import { useState } from "react";
import type { Patient, Sex } from "../../types";
import { uid } from "../../utils/format";
import { Field, TextArea } from "../common/Field";
const blank = (): Patient => ({ id: uid("PAT"), name:"", dob:"", ageText:"", sex:"Not recorded", phone:"", address:"", weightKg:"", allergies:"", conditions:"", currentMedicines:"", createdAt:new Date().toISOString(), updatedAt:new Date().toISOString() });
export default function PatientForm({initial,onSave,onCancel}:{initial?:Patient;onSave:(p:Patient)=>void;onCancel:()=>void}) {
  const [p,setP] = useState<Patient>(initial ?? blank());
  const set = (key:keyof Patient,value:string) => setP(old=>({...old,[key]:value,updatedAt:new Date().toISOString()}));
  function submit(e:React.FormEvent){e.preventDefault();if(!p.name.trim())return;onSave(p);}
  return <form className="form-grid" onSubmit={submit}>
    <Field label="Patient full name *" value={p.name} onChange={e=>set("name",e.target.value)} required/>
    <Field label="Date of birth" type="date" value={p.dob} onChange={e=>set("dob",e.target.value)}/>
    <Field label="Age (if DOB unknown)" placeholder="e.g. 4 years 3 months" value={p.ageText} onChange={e=>set("ageText",e.target.value)}/>
    <label className="field"><span>Sex</span><select value={p.sex} onChange={e=>set("sex",e.target.value as Sex)}><option>Not recorded</option><option>Female</option><option>Male</option><option>Other</option></select></label>
    <Field label="Phone number" value={p.phone} onChange={e=>set("phone",e.target.value)}/>
    <Field label="Weight (kg)" value={p.weightKg} onChange={e=>set("weightKg",e.target.value)}/>
    <div className="full"><TextArea label="Address" rows={2} value={p.address} onChange={e=>set("address",e.target.value)}/></div>
    <div className="full"><TextArea label="Known allergies" rows={2} placeholder="Record known allergies; write 'Not known' only when appropriate." value={p.allergies} onChange={e=>set("allergies",e.target.value)}/></div>
    <div className="full"><TextArea label="Existing conditions / relevant history" rows={2} value={p.conditions} onChange={e=>set("conditions",e.target.value)}/></div>
    <div className="full"><TextArea label="Current medicines" rows={2} value={p.currentMedicines} onChange={e=>set("currentMedicines",e.target.value)}/></div>
    <div className="form-actions full"><button className="button secondary" type="button" onClick={onCancel}>Cancel</button><button className="button primary" type="submit">Save patient</button></div>
  </form>;
}

import type { PrescriptionItem } from "../../types";
import { Field, TextArea } from "../common/Field";
export default function MedicineItemForm({item,onChange,onRemove}:{item:PrescriptionItem;onChange:(p:PrescriptionItem)=>void;onRemove:()=>void}) {
  const set=(k:keyof PrescriptionItem,v:string)=>onChange({...item,[k]:v});
  return <section className="medicine-card">
    <div className="card-heading"><b>Medicine details</b><button className="text-button danger-text" type="button" onClick={onRemove}>Remove</button></div>
    <div className="form-grid compact">
      <Field label="Medicine name *" value={item.medicineName} onChange={e=>set("medicineName",e.target.value)} required/>
      <Field label="Generic name" value={item.genericName} onChange={e=>set("genericName",e.target.value)}/>
      <Field label="Strength *" value={item.strength} onChange={e=>set("strength",e.target.value)} placeholder="e.g. 500 mg" required/>
      <Field label="Dosage form" value={item.dosageForm} onChange={e=>set("dosageForm",e.target.value)} placeholder="Tablet / capsule / syrup"/>
      <Field label="Dose per administration *" value={item.dose} onChange={e=>set("dose",e.target.value)} placeholder="As prescribed" required/>
      <label className="field"><span>Route *</span><select value={item.route} onChange={e=>set("route",e.target.value)}><option>Oral</option><option>Topical</option><option>Inhalation</option><option>Intramuscular</option><option>Intravenous</option><option>Subcutaneous</option><option>Ophthalmic</option><option>Otic</option><option>Rectal</option><option>Other</option></select></label>
      <Field label="Frequency *" value={item.frequency} onChange={e=>set("frequency",e.target.value)} placeholder="Clinician enters instructions" required/>
      <Field label="Duration *" value={item.duration} onChange={e=>set("duration",e.target.value)} placeholder="e.g. 5 days / as directed" required/>
      <Field label="Total quantity" value={item.quantity} onChange={e=>set("quantity",e.target.value)}/>
      <div className="full"><TextArea label="Special instructions" rows={2} value={item.instructions} onChange={e=>set("instructions",e.target.value)} placeholder="Enter patient-specific instructions"/></div>
    </div>
  </section>;
}

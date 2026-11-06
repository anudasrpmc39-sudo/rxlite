import { useMemo, useState } from "react";
import type { Medicine } from "../../types";
import { searchMedicines } from "../../services/medicine.service";
import { Field } from "../common/Field";
export default function MedicinePicker({catalogue,onChoose,onCustom}:{catalogue:Medicine[];onChoose:(m:Medicine)=>void;onCustom:()=>void}) {
  const [q,setQ]=useState("");
  const results=useMemo(()=>searchMedicines(catalogue,q),[catalogue,q]);
  return <div className="picker"><Field label="Search medicine catalogue" value={q} onChange={e=>setQ(e.target.value)} placeholder="Generic name, brand, strength or form"/>
    {q && <div className="search-results">{results.map(m=><button type="button" className="search-result" key={m.id} onClick={()=>{onChoose(m);setQ("");}}><b>{m.brandName || m.genericName}</b><span>{m.genericName} · {m.strength} · {m.dosageForm}</span><small>{m.verified?"Catalogue entry":"Custom entry"}</small></button>)}{results.length===0&&<p className="muted pad">No matching medicines.</p>}</div>}
    <button className="text-button" type="button" onClick={onCustom}>+ Enter medicine manually</button>
  </div>;
}

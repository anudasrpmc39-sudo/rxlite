import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useVault } from "./hooks/useVault";
import Layout from "./components/common/Layout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import PrescriptionEditor from "./pages/PrescriptionEditor";
import PrescriptionPreview from "./pages/PrescriptionPreview";
import Settings from "./pages/Settings";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import "./styles/global.css";
import "./styles/print.css";
function Gate() {
  const vault=useVault();const [pass,setPass]=useState("");const [confirmPass,setConfirmPass]=useState("");
  if(vault.busy&&vault.exists===null)return <div className="gate"><p>Loading RxLite…</p></div>;
  if(!vault.data)return <div className="gate"><div className="gate-card"><div className="brand centered"><span className="brand-mark">Rx</span><span><b>RxLite</b><small>GP Prescription Writer</small></span></div><div className="gate-icon"><ShieldCheck size={26}/></div><h1>{vault.exists?"Unlock your local workspace":"Create your local workspace"}</h1><p className="muted">{vault.exists?"Enter your vault password to access records on this device.":"Choose a strong password. It protects the encrypted local data vault."}</p><form onSubmit={e=>{e.preventDefault();vault.exists?vault.unlock(pass):vault.setup(pass);}}><label className="field"><span>Vault password</span><input type="password" value={pass} onChange={e=>setPass(e.target.value)} minLength={10} required autoComplete="current-password"/></label>{!vault.exists&&<label className="field"><span>Confirm password</span><input type="password" value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} required autoComplete="new-password"/></label>}{!vault.exists&&pass&&pass!==confirmPass&&<p className="error-text">Passwords do not match.</p>}<button className="button primary full-button" disabled={vault.busy||(!vault.exists&&pass!==confirmPass)}><LockKeyhole size={16}/>{vault.exists?"Unlock workspace":"Create encrypted vault"}</button></form>{vault.error&&<div className="error-box">{vault.error}</div>}<p className="tiny muted">Local-only application. Your records are not sent to RxLite servers. If you lose your password and have no usable backup, data cannot be recovered.</p></div></div>;
  return <BrowserRouter><Routes><Route element={<Layout onLock={vault.lock}/>}>
    <Route path="/" element={<Dashboard data={vault.data}/>}/>
    <Route path="/patients" element={<Patients data={vault.data} onChange={vault.update}/>}/>
    <Route path="/patients/:id" element={<PatientDetails data={vault.data}/>}/>
    <Route path="/prescription/new/:patientId" element={<PrescriptionEditor data={vault.data} onChange={vault.update}/>}/>
    <Route path="/prescription/:patientId/:prescriptionId" element={<PrescriptionEditor data={vault.data} onChange={vault.update}/>}/>
    <Route path="/prescription/preview/:id" element={<PrescriptionPreview data={vault.data}/>}/>
    <Route path="/settings" element={<Settings data={vault.data} onChange={vault.update}/>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Route></Routes></BrowserRouter>;
}
export default function App(){return <Gate/>;}

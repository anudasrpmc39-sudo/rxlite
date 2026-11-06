import { NavLink, Outlet } from "react-router-dom";
import { Activity, ClipboardList, Home, Settings, Users, LockKeyhole } from "lucide-react";
export default function Layout({ onLock }: { onLock: () => void }) {
  const links = [
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/patients", label: "Patients", icon: Users },
    { to: "/settings", label: "Settings", icon: Settings }
  ];
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">Rx</span><span><b>RxLite</b><small>GP Prescription Writer</small></span></div>
      <nav>{links.map(({to,label,icon:Icon}) => <NavLink key={to} to={to} end className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><Icon size={18}/>{label}</NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="offline"><Activity size={15}/> Local workspace</div><button className="nav-link lock-button" onClick={onLock}><LockKeyhole size={18}/> Lock application</button></div>
    </aside>
    <main className="main-content"><header className="topbar"><span>RxLite <span className="muted">/ Bangladesh</span></span><span className="status-dot">● Offline-ready</span></header><div className="page-content"><Outlet/></div></main>
  </div>;
}

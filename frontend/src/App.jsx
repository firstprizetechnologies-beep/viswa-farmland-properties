import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Sprout, LayoutDashboard, MapPinned, Plus, LogOut, Search, Pencil,
  Eye, EyeOff, Trash2, X, UploadCloud, Image as ImageIcon, Menu,
  CheckCircle2, Ban, IndianRupee, Map, RefreshCw
} from "lucide-react";
import api from "./api";
import PublicProperties from "./PublicProperties";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import Services from "./Services";

const emptyForm = {
  title: "", location: "", district: "", price: "", area: "",
  description: "", amenities: ""
};

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("viswa_admin_token", data.token);
      onLogin(data.admin);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to sign in. Check the API server.");
    } finally { setBusy(false); }
  }

  return <main className="login-wrap">
    <section className="login-card">
      <div className="brand-mark"><Sprout size={30}/></div>
      <p className="eyebrow">VISWA FARMLAND PROPERTIES</p>
      <h1>Welcome back</h1>
      <p className="muted">Sign in to manage your property listings.</p>
      <form onSubmit={submit} className="form-stack">
        <label>Email address<input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com"/></label>
        <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"/></label>
        {error && <div className="alert error">{error}</div>}
        <button className="btn primary full" disabled={busy}>{busy ? "Signing in…" : "Sign in to admin"}</button>
      </form>
      <p className="login-foot">Authorised administrators only</p>
    </section>
  </main>;
}

function PropertyModal({ property, onClose, onSaved }) {
  const [form, setForm] = useState(property ? {
    title: property.title || "", location: property.location || "",
    district: property.district || "", price: property.price ?? "",
    area: property.area || "", description: property.description || "",
    amenities: (property.amenities || []).join(", ")
  } : emptyForm);
  const [newFiles, setNewFiles] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const currentImages = (property?.images || []).filter(url => !removedImages.includes(url));

  function change(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); }
  function selectFiles(e) {
    const selected = Array.from(e.target.files || []);
    const available = 10 - currentImages.length - newFiles.length;
    if (selected.length > available) setError(`You can attach only ${available} more image(s).`);
    else setError("");
    setNewFiles(prev => [...prev, ...selected].slice(0, Math.max(0, available)));
    e.target.value = "";
  }

  async function submit(e) {
    e.preventDefault(); setBusy(true); setError("");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    data.append("amenities", JSON.stringify(form.amenities.split(",").map(x=>x.trim()).filter(Boolean)));
    data.append("removeImages", JSON.stringify(removedImages));
    newFiles.forEach(file => data.append("images", file));
    try {
      if (property) await api.put(`/admin/properties/${property._id}`, data);
      else await api.post("/admin/properties", data);
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save property.");
    } finally { setBusy(false); }
  }

  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
    <section className="modal">
      <header className="modal-head"><div><p className="eyebrow">{property ? "UPDATE LISTING" : "NEW LISTING"}</p><h2>{property ? "Edit property" : "Add a property"}</h2></div><button className="icon-btn" onClick={onClose}><X/></button></header>
      <form onSubmit={submit}>
        <div className="form-grid">
          <label className="wide">Property title *<input name="title" required maxLength="150" value={form.title} onChange={change} placeholder="e.g. Scenic coconut farmland"/></label>
          <label>Location *<input name="location" required value={form.location} onChange={change} placeholder="Village / town"/></label>
          <label>District<input name="district" value={form.district} onChange={change} placeholder="e.g. Kanyakumari"/></label>
          <label>Price (₹)<input type="number" min="0" name="price" value={form.price} onChange={change} placeholder="Property price"/></label>
          <label>Land area<input name="area" value={form.area} onChange={change} placeholder="e.g. 10 cents / 1 acre"/></label>
          <label className="wide">Description<textarea name="description" rows="4" maxLength="5000" value={form.description} onChange={change} placeholder="Describe the land, access, water source and nearby facilities…"/></label>
          <label className="wide">Amenities (comma separated)<input name="amenities" value={form.amenities} onChange={change} placeholder="Road access, Borewell, Electricity"/></label>
          <div className="wide">
            <label>Property images (up to 10 total)</label>
            <div className="upload-box"><UploadCloud size={24}/><strong>Choose property photos</strong><span>JPG, PNG or WebP · Maximum 5 MB each</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={selectFiles}/></div>
            {(currentImages.length > 0 || newFiles.length > 0) && <div className="image-grid">
              {currentImages.map(url=><div className="image-thumb" key={url}><img src={url} alt="Property"/><button type="button" onClick={()=>setRemovedImages(prev=>[...prev,url])} title="Remove image"><X size={15}/></button></div>)}
              {newFiles.map((file,i)=><div className="image-thumb" key={`${file.name}-${i}`}><img src={URL.createObjectURL(file)} alt={file.name}/><button type="button" onClick={()=>setNewFiles(prev=>prev.filter((_,n)=>n!==i))}><X size={15}/></button></div>)}
            </div>}
          </div>
        </div>
        {error && <div className="alert error">{error}</div>}
        <footer className="modal-actions"><button type="button" className="btn light" onClick={onClose}>Cancel</button><button className="btn primary" disabled={busy}>{busy ? "Saving…" : property ? "Save changes" : "Create listing"}</button></footer>
      </form>
    </section>
  </div>;
}

function AdminApp() {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({total:0,active:0,disabled:0});
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [notice, setNotice] = useState("");
  const [busyId, setBusyId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("viswa_admin_token");
    if (!token) { setChecking(false); return; }
    api.get("/auth/me").then(({data})=>setAdmin(data.admin))
      .catch(()=>localStorage.removeItem("viswa_admin_token"))
      .finally(()=>setChecking(false));
  }, []);

  async function load() {
    const [p,s] = await Promise.all([api.get("/admin/properties"),api.get("/admin/dashboard")]);
    setProperties(p.data); setStats(s.data);
  }
  useEffect(()=>{ if(admin) load().catch(()=>setNotice("Unable to load dashboard data.")); },[admin]);

  function logout() { localStorage.removeItem("viswa_admin_token"); setAdmin(null); setProperties([]); }
  async function toggle(property) {
    setBusyId(property._id);
    try {
      await api.patch(`/admin/properties/${property._id}/status`,{status:!property.status});
      await load(); setNotice(`Listing ${property.status ? "disabled" : "enabled"} successfully.`);
    } catch { setNotice("Could not update listing status."); }
    finally { setBusyId(""); }
  }
  async function remove(property) {
    if(!window.confirm(`Permanently delete "${property.title}" and its uploaded photos?`)) return;
    setBusyId(property._id);
    try { await api.delete(`/admin/properties/${property._id}`); await load(); setNotice("Property deleted."); }
    catch { setNotice("Could not delete property."); }
    finally { setBusyId(""); }
  }
  const visible = useMemo(()=>properties.filter(p=>{
    const q=query.toLowerCase();
    const matches = [p.title,p.location,p.district].some(v=>(v||"").toLowerCase().includes(q));
    return matches && (filter==="all" || (filter==="active" ? p.status : !p.status));
  }),[properties,query,filter]);

  if(checking) return <div className="loading">Loading admin panel…</div>;
  if(!admin) return <Login onLogin={setAdmin}/>;

  return <div className="app-shell">
    <aside className={`sidebar ${sidebarOpen?"open":""}`}>
      <div className="side-brand"><span className="brand-mark small"><Sprout/></span><div><b>VISWA FARMLAND</b><small>PROPERTY ADMIN</small></div><button className="icon-btn mobile-close" onClick={()=>setSidebarOpen(false)}><X/></button></div>
      <p className="side-label">WORKSPACE</p>
      <button className="nav-item active"><LayoutDashboard size={18}/> Dashboard</button>
      <button className="nav-item" onClick={()=>{setFilter("all");setSidebarOpen(false);}}><MapPinned size={18}/> Property listings</button>
      <div className="side-bottom"><div className="admin-mini"><div className="avatar">{admin.email?.[0]?.toUpperCase()}</div><div><b>Administrator</b><small>{admin.email}</small></div></div><button className="nav-item logout" onClick={logout}><LogOut size={18}/> Sign out</button></div>
    </aside>
    {sidebarOpen && <div className="side-scrim" onClick={()=>setSidebarOpen(false)}/>}
    <main className="main-area">
      <header className="topbar"><button className="icon-btn mobile-menu" onClick={()=>setSidebarOpen(true)}><Menu/></button><div><span className="muted">Workspace</span><span className="crumb"> / Dashboard</span></div><div className="top-user"><span className="online-dot"/> Admin session</div></header>
      <div className="page-content">
        <div className="page-heading"><div><p className="eyebrow">PROPERTY MANAGEMENT</p><h1>Dashboard</h1><p className="muted">Manage your farmland listings in one place.</p></div><button className="btn primary" onClick={()=>setModal({property:null})}><Plus size={18}/> Add property</button></div>
        {notice && <div className="alert success">{notice}<button onClick={()=>setNotice("")}><X size={16}/></button></div>}
        <section className="stats-grid">
          <Stat icon={<MapPinned/>} label="Total properties" value={stats.total} tone="green"/>
          <Stat icon={<CheckCircle2/>} label="Active listings" value={stats.active} tone="blue"/>
          <Stat icon={<Ban/>} label="Disabled listings" value={stats.disabled} tone="amber"/>
        </section>
        <section className="listing-panel">
          <div className="panel-heading"><div><h2>Property listings</h2><p className="muted">Add, edit and control public visibility.</p></div><button className="icon-btn" onClick={()=>load()} title="Refresh"><RefreshCw size={17}/></button></div>
          <div className="toolbar"><div className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search title, location or district…"/></div><select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All listings</option><option value="active">Active</option><option value="disabled">Disabled</option></select></div>
          <div className="table-wrap"><table><thead><tr><th>PROPERTY</th><th>LOCATION</th><th>PRICE</th><th>STATUS</th><th>UPDATED</th><th>ACTIONS</th></tr></thead><tbody>
            {visible.map(p=><tr key={p._id}><td><div className="property-cell">{p.images?.[0] ? <img src={p.images[0]} alt=""/> : <div className="no-image"><ImageIcon/></div>}<div><b>{p.title}</b><small>{p.area || "Area not specified"}</small></div></div></td><td>{p.location}<small className="subline">{p.district}</small></td><td>{p.price ? `₹${Number(p.price).toLocaleString("en-IN")}` : "Contact for price"}</td><td><span className={`status ${p.status?"active":"disabled"}`}><i/>{p.status?"Active":"Disabled"}</span></td><td>{new Date(p.updatedAt).toLocaleDateString("en-IN")}</td><td><div className="actions"><button title="Edit" className="action-btn" onClick={()=>setModal({property:p})}><Pencil size={16}/></button><button title={p.status?"Disable":"Enable"} className="action-btn" disabled={busyId===p._id} onClick={()=>toggle(p)}>{p.status?<EyeOff size={16}/>:<Eye size={16}/>}</button><button title="Delete" className="action-btn danger" disabled={busyId===p._id} onClick={()=>remove(p)}><Trash2 size={16}/></button></div></td></tr>)}
            {!visible.length && <tr><td colSpan="6"><div className="empty-state"><Map size={30}/><b>No properties found</b><span>Try another search or add your first listing.</span></div></td></tr>}
          </tbody></table></div>
          <div className="table-foot">Showing {visible.length} of {properties.length} properties</div>
        </section>
        <p className="copyright">© {new Date().getFullYear()} Viswa Farmland Properties · Admin workspace</p>
      </div>
    </main>
    {modal && <PropertyModal property={modal.property} onClose={()=>setModal(null)} onSaved={async()=>{setModal(null);await load();setNotice("Property saved successfully.");}}/>}
  </div>;
}

function Stat({icon,label,value,tone}) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div><p>{label}</p><strong>{value}</strong></div></article>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/properties" element={<PublicProperties />} />

        {/* Replace Home with your Services component when available */}
        <Route path="/services" element={<Services  />} />

        {/* Admin panel and login */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Unknown URLs */}
        <Route path="*" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  );
}

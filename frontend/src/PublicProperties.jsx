import { useEffect, useMemo, useState } from "react";
import { MapPin, Ruler, Signpost, Droplets, Eye, MessageCircle, X, ChevronLeft, ChevronRight, Sprout, Menu } from "lucide-react";
import api from "./api";
import "./public-properties.css";
import { Link, NavLink } from "react-router-dom";

const WHATSAPP_NUMBER = "919360940142";
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";
const imageUrl = (image) => typeof image === "string" ? image : image?.url || "";
const priceText = (price) => price === undefined || price === null || price === "" || Number(price) === 0 ? "Price on Request" : typeof price === "number" || !Number.isNaN(Number(price)) ? `₹${Number(price).toLocaleString("en-IN")}` : price;
const waLink = (name) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Viswa Farmland Properties, I am interested in ${name}. Please share more details.`)}`;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="vf-header">
      <div className="vf-header-inner">

        <Link className="vf-logo" to="/" onClick={closeMenu}>
          <img
            src="/assets/img/logo.png"
            onError={e => {
              e.currentTarget.style.display = "none";
            }}
            alt=""
          />
        </Link>

        <button
          className="vf-menu-toggle"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle navigation"
        >
          <Menu />
        </button>

        <nav className={menuOpen ? "open" : ""}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
          <NavLink to="/services" onClick={closeMenu}>Our Services</NavLink>
          <NavLink to="/properties" onClick={closeMenu}>Properties</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        </nav>

      </div>
    </header>
  );
}

export function SiteFooter() {
  return <footer className="vf-footer"><div className="vf-footer-top"><div className="vf-footer-grid">
    <div><Link className="vf-footer-brand" to="/">Viswa Farmland</Link><p>Viswa Farmland Properties</p><p>Womens Christian College Junction<br/>Nagercoil, Pin - 629001</p><p><b>Phone:</b> +91 9150102491, +91 6384849747</p><p><b>Email:</b> viswaproperties.2026@gmail.com</p></div>
    <div><h4>Useful Links</h4><Link to="/">Home</Link><Link to="/about">About Us</Link><Link to="/services">Services</Link><Link to="/properties">Properties</Link><Link to="/contact">Contact</Link></div>
    <div><h4>Our Services</h4><Link to="/services">Farmland Sales</Link><Link to="/services">Agricultural Land</Link><Link to="/services">Property Investment</Link><Link to="/services">Site Visit Assistance</Link></div>
  </div></div><div className="vf-copyright"><span>© {new Date().getFullYear()} <b>Viswa Farmland Properties</b>. All Rights Reserved<br/><small>Designed by <a href="https://www.jandctechnologies.com/" target="_blank" rel="noreferrer">JandC Tech</a></small></span><div className="vf-social"><a href="https://www.facebook.com/profile.php?id=61585438610910" target="_blank" rel="noreferrer">f</a><a href="https://www.instagram.com/Viswa_Properties.2026" target="_blank" rel="noreferrer">◎</a><a href="https://www.youtube.com/@Viswaproperties_2026" target="_blank" rel="noreferrer">▶</a></div></div></footer>;
}

function PropertyDetails({ property, onClose }) {
  const images = (property.images || []).map(imageUrl).filter(Boolean);
  const [active, setActive] = useState(0);
  const amenities = property.amenities || [];
  useEffect(()=>{ const fn=e=>{if(e.key==="Escape")onClose();};window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn);},[onClose]);
  return <div className="vf-modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><section className="vf-modal" role="dialog" aria-modal="true" aria-label="Property details">
    <div className="vf-modal-head"><h2>{property.title}</h2><button onClick={onClose} aria-label="Close"><X/></button></div>
    <div className="vf-modal-body"><div className="vf-gallery-main"><img src={images[active] || FALLBACK_IMAGE} alt={property.title}/>{images.length>1&&<><button className="vf-gallery-prev" onClick={()=>setActive((active-1+images.length)%images.length)}><ChevronLeft/></button><button className="vf-gallery-next" onClick={()=>setActive((active+1)%images.length)}><ChevronRight/></button></>}</div>
      {images.length>1&&<div className="vf-gallery-thumbs">{images.map((src,i)=><button className={active===i?"selected":""} key={src+i} onClick={()=>setActive(i)}><img src={src} alt={`${property.title} ${i+1}`}/></button>)}</div>}
      <p className="vf-detail-location"><MapPin size={17}/> {property.location}{property.district ? `, ${property.district}` : ""}</p><h3 className="vf-detail-price">{priceText(property.price)}</h3>
      <div className="vf-detail-facts"><span><Ruler/> {property.area || "Area on request"}</span>{amenities.map((item,i)=><span key={i}><Sprout/> {item}</span>)}</div>
      <p className="vf-description">{property.description || "Contact us for more information about this property."}</p><a className="vf-btn vf-whatsapp" href={waLink(property.title)} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Enquire About This Property</a>
    </div></section></div>;
}

export default function PublicProperties() {
  const [properties,setProperties] = useState([]); const [search,setSearch] = useState(""); const [loading,setLoading] = useState(true); const [error,setError] = useState(""); const [selected,setSelected] = useState(null);
  useEffect(()=>{ let alive=true; api.get("/public/properties").then(({data})=>{if(alive)setProperties(Array.isArray(data)?data:data.properties||[]);}).catch(()=>{if(alive)setError("Unable to load properties at the moment. Please contact us for assistance.");}).finally(()=>{if(alive)setLoading(false);}); return()=>{alive=false;}; },[]);
  const visible = useMemo(()=>properties.filter(p=>[p.title,p.location,p.district].join(" ").toLowerCase().includes(search.trim().toLowerCase())),[properties,search]);
  return <div className="vf-public"><SiteHeader/><main>
    <section className="vf-page-title contact-banner"><div className="vf-page-title-inner"><h1>Our Properties</h1><div className="vf-breadcrumb"><Link to="/">Home</Link><span>/</span><b>Properties</b></div></div></section>
    <section className="vf-listing-section"><div className="vf-container"><div className="vf-section-title"><h2>AVAILABLE PROPERTIES</h2><p>Find Your Ideal Farmland Investment</p></div>
      <div className="vf-search"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by property name or location..." aria-label="Search properties"/></div>
      {loading&&<div className="vf-state">Loading available properties…</div>}
      {error&&<div className="vf-state vf-error">{error}</div>}
      {!loading&&!error&&visible.length===0&&<div className="vf-empty"><Sprout size={54}/><h3>No Properties Available</h3><p>{search?"No properties match your search. Try another name or location.":"Please contact us for currently available farmland properties."}</p><Link className="vf-btn vf-green" to="/contact">Contact Us</Link></div>}
      {!loading&&!error&&visible.length>0&&<div className="vf-property-grid">{visible.map(property=>{
        const image=(property.images||[]).map(imageUrl).find(Boolean)||FALLBACK_IMAGE;
        return <article className="vf-property-card" key={property._id}><div className="vf-property-image"><img src={image} alt={property.title} loading="lazy" onError={e=>{e.currentTarget.src=FALLBACK_IMAGE;}}/>
        {/*<span className="vf-status">Available</span>*/}
       <span className={`vf-status ${property.status ? "available" : "not-available"}`}>
  {property.status ? "Available" : "Not Available"}
</span>
        </div><div className="vf-property-content"><h3>{property.title||"Farmland Property"}</h3><p className="vf-location"><MapPin size={15}/>{property.location}{property.district?`, ${property.district}`:""}</p><p className="vf-type">Agricultural Land</p><div className="vf-price">{priceText(property.price)}</div><div className="vf-features"><span><Ruler/>{property.area||"Area on request"}</span>{(property.amenities||[]).slice(0,2).map((item,i)=><span key={i}>{/water|bore|well/i.test(item)?<Droplets/>:<Signpost/>}{item}</span>)}</div><div className="vf-card-actions"><button className="vf-btn vf-green" onClick={()=>setSelected(property)}><Eye size={15}/> View Details</button><a className="vf-btn vf-whatsapp" href={waLink(property.title||"your property")} target="_blank" rel="noreferrer"><MessageCircle size={15}/> Enquiry</a></div></div></article>;
      })}</div>}
    </div></section>
    <section className="vf-enquiry"><h2>Looking for Your Dream Farmland?</h2><p>Contact Viswa Farmland Properties for property details and site visits.</p><a className="vf-btn vf-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Contact Us on WhatsApp</a></section>
  </main><SiteFooter/><a className="vf-scroll-top" href="#top" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:"smooth"});}} aria-label="Scroll to top">↑</a>{selected&&<PropertyDetails property={selected} onClose={()=>setSelected(null)}/>}</div>;
}

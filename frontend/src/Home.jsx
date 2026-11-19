import { useEffect, useState } from "react";
import { ArrowRight, Sprout, House, Flower2, TrendingUp, Signpost, Droplets, UserCheck, MapPin, Headset, TreePine, Users } from "lucide-react";
import { SiteHeader, SiteFooter } from "./PublicProperties";
import "./home.css";

const slides = [
  { image: "/assets/img/hero_1.jpg", title: "Invest in Land, Grow Your Future with Viswa Farmland Properties", text: "Discover the beauty of nature and the value of smart land investments. We help you find the right farmland to build your dreams, secure your future, and enjoy the benefits of nature." },
  { image: "/assets/img/hero_2.jpg", title: "Your Dream Farmland, Your Better Tomorrow!", text: "Escape the busy city life and embrace peaceful green landscapes, fertile farmland, and promising investment opportunities. Own a piece of nature today." },
  { image: "/assets/img/hero_3.jpg", title: "Secure Your Future with the Gift of Land!", text: "A piece of land is more than an investment; it can become a legacy for generations. Explore farmland opportunities surrounded by nature and possibilities." },
  { image: "/assets/img/hero_4.jpg", title: "Grow Green, Live Better with Viswa Farmland Properties!", text: "Turn your dream of owning farmland into reality. Enjoy the peace of nature, the joy of agriculture, and the potential of long-term land appreciation." },
  { image: "/assets/img/hero_5.jpg", title: "Make Your Land Dreams a Reality!", text: "Your journey towards a better future begins with the right investment. Discover beautiful farmland where nature, peace, and prosperity come together." }
];
const services = [
  [House,"Farmland Sales","Explore quality farmland properties in peaceful locations for investment and agricultural purposes."],
  [Flower2,"Agricultural Land","Find suitable agricultural land with fertile surroundings for farming, cultivation, and future development."],
  [TrendingUp,"Property Investment","Invest in valuable farmland and create opportunities for long-term growth and a secure future."],
  [Signpost,"Road Access Plots","Discover farmland properties with convenient road access for easy travel and property management."],
  [Droplets,"Water Facility Lands","Choose selected properties with suitable water facilities to support farming and land development."],
  [UserCheck,"Property Guidance","Get trusted guidance to help you choose the right farmland for your needs and investment goals."],
  [MapPin,"Site Visit Assistance","Visit and explore available farmland properties with assistance from our experienced team."],
  [Headset,"Customer Support","We provide friendly support throughout your farmland property journey."]
];
const benefits = [
  [TreePine,"Affordable Farmland Plots","Explore budget-friendly agricultural land and farmland plots to suit your investment needs."],
  [Droplets,"Good Water Facilities","Find agricultural properties with access to water resources to support farming and development."],
  [Signpost,"Convenient Road Access","Selected farmland locations offer good road connectivity for convenient access and management."],
  [Users,"Trusted Property Guidance","We guide buyers throughout property selection and purchasing with transparency and care."],
  [TrendingUp,"A Valuable Long-Term Investment","Own a piece of land today and create opportunities for future growth and family prosperity."]
];

export default function Home() {
  const [active,setActive] = useState(0);
  useEffect(()=>{const timer=setInterval(()=>setActive(v=>(v+1)%slides.length),5000);return()=>clearInterval(timer);},[]);
  const slide=slides[active];
  return <div className="vf-public vf-home"><SiteHeader/><main>
    <section className="vf-hero" aria-label="Farmland highlights">
      {slides.map((item, i) => (
  <div
    key={item.image}
    className={`vf-hero-slide ${i === active ? "is-active" : ""}`}
    style={{
      backgroundImage: `linear-gradient(90deg, rgba(8,28,17,.72), rgba(8,28,17,.28)), url("${item.image}")`
    }}
    aria-hidden={i !== active}
  />
))} 
      <div className="vf-hero-content" key={active}><p className="vf-hero-kicker">VISWA FARMLAND PROPERTIES</p><h1>{slide.title}</h1><p>{slide.text}</p><a href="/properties" className="vf-hero-button">Explore Properties <ArrowRight size={17}/></a></div>
      <button className="vf-hero-arrow prev" onClick={()=>setActive(v=>(v-1+slides.length)%slides.length)} aria-label="Previous slide">‹</button><button className="vf-hero-arrow next" onClick={()=>setActive(v=>(v+1)%slides.length)} aria-label="Next slide">›</button>
      <div className="vf-hero-dots">{slides.map((s,i)=><button key={s.image} className={i===active?"active":""} onClick={()=>setActive(i)} aria-label={`Show slide ${i+1}`}/>)}</div>
    </section>
    <section className="vf-home-services"><div className="vf-container"><div className="vf-home-heading"><span>WHAT WE OFFER</span><h2>OUR SERVICES</h2><p>Helping You Find the Perfect Farmland Investment</p></div><div className="vf-service-grid">{services.map(([Icon,title,desc],i)=><article className="vf-service-card" key={title}><span className="vf-service-number">{String(i+1).padStart(2,"0")}</span><div className="vf-service-icon"><Icon size={31}/></div><h3>{title}</h3><p>{desc}</p></article>)}</div></div></section>
    <section className="vf-home-about"><div className="vf-container vf-about-grid"><div className="vf-about-visual"><img src="/assets/img/img_long_5.png" alt="Green farmland at Viswa Farmland Properties" onError={e=>{e.currentTarget.src="/assets/img/img_long_5.jpg";}}/><div className="vf-director"><b>Mr. C. Paul Durai B.E.</b><span>Managing Director</span><small>Viswa Farmland Properties</small></div></div><div className="vf-about-copy"><span className="vf-about-kicker">WHY CHOOSE US</span><h2>Your Trusted Partner for <strong>15 Years of Experience in Farmland Investment &amp; Agricultural Properties</strong></h2><p>Discover the perfect farmland investment with Viswa Farmland Properties. We help you find affordable agricultural lands in peaceful locations with good road access, fertile soil, and water facilities. Invest in land today and build a greener, more valuable tomorrow.</p><div className="vf-benefits">{benefits.map(([Icon,title,desc])=><div className="vf-benefit" key={title}><Icon/><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div><strong className="vf-tagline">Viswa Farmland Properties – Invest Today... Grow Tomorrow!</strong><a href="/about" className="vf-about-link">Know More About Us <ArrowRight size={16}/></a></div></div></section>
    <section className="vf-home-cta"><h2>Find the Right Farmland for Your Future</h2><p>Talk to our team to explore available properties and arrange a site visit.</p><a href="https://wa.me/919360940142" target="_blank" rel="noreferrer">Chat with us on WhatsApp <ArrowRight size={17}/></a></section>
  </main><SiteFooter/><a className="vf-scroll-top" href="#top" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:"smooth"});}} aria-label="Scroll to top">↑</a></div>;
}

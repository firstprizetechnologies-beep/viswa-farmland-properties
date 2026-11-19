
import {
  ArrowRight,
  Sprout,
  Droplets,
  Signpost,
  Users,
  TrendingUp,
  TreePine,
  ShieldCheck,
  Handshake
} from "lucide-react";

import { SiteHeader, SiteFooter } from "./PublicProperties";
import "./about.css";
import { Link } from "react-router-dom";

const reasons = [
  {
    Icon: Sprout,
    title: "Quality Farmland",
    description:
      "Explore carefully selected farmland properties suitable for agriculture and future investment."
  },
  {
    Icon: Droplets,
    title: "Water Facilities",
    description:
      "Find properties with suitable water resources to support agricultural activities."
  },
  {
    Icon: Signpost,
    title: "Road Connectivity",
    description:
      "We help you explore farmland locations with convenient road access."
  },
  {
    Icon: ShieldCheck,
    title: "Transparent Guidance",
    description:
      "We believe in clear communication and reliable assistance throughout your property journey."
  },
  {
    Icon: Handshake,
    title: "Customer Support",
    description:
      "Our team assists you from property selection to arranging site visits."
  },
  {
    Icon: TrendingUp,
    title: "Long-Term Value",
    description:
      "Explore land ownership opportunities that can support your long-term investment goals."
  }
];

export default function About() {
  return (
    <div className="vf-public vf-about-page">
      <SiteHeader />

      <main>
        {/* Page Banner */}
        <section className="contact-banner vf-page-title">
          <div className="vf-page-title-inner">
            <h1>About Us</h1>
            <div class="vf-breadcrumb">
              <Link to="/">Home</Link> / About Us
            </div>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="about-intro">
          <div className="vf-container about-intro-grid">

            <div className="about-image">
              <img
                src="/assets/img/img_long_5.png"
                alt="Viswa Farmland Properties agricultural land"
                onError={(e) => {
                  e.currentTarget.src = "/assets/img/img_long_5.jpg";
                }}
              />

              <div className="about-experience">
                <strong>15+</strong>
                <span>Years of Experience</span>
              </div>
            </div>

            <div className="about-description">
              <span className="about-kicker">ABOUT OUR COMPANY</span>

              <h2>
                Welcome to <strong>Viswa Farmland Properties</strong>
              </h2>

              <p>
                Viswa Farmland Properties is dedicated to helping customers
                discover suitable farmland and agricultural property
                opportunities in and around Nagercoil and surrounding areas.
              </p>

              <p>
                We understand that buying land is an important decision.
                Our aim is to make your property journey easier through
                personalized guidance, transparent information and
                assistance in exploring available farmland properties.
              </p>

              <p>
                Whether you are looking for agricultural land, a peaceful
                farmland location or a long-term property investment, our
                team is here to help you make an informed decision.
              </p>

              <div className="about-director">
                <h3>Mr. C. Paul Durai B.E.</h3>
                <span>Managing Director</span>
                <p>Viswa Farmland Properties</p>
              </div>

              <Link to="/contact" className="about-contact-link">
                Contact Our Team <ArrowRight size={17} />
              </Link>
            </div>

          </div>
        </section>

        {/* Vision and Mission */}
        <section className="about-vision">
          <div className="vf-container">
            <div className="about-section-heading">
              <span>OUR PURPOSE</span>
              <h2>Our Vision & Mission</h2>
            </div>

            <div className="row g-4">
              <div className="col-lg-6">
                <div className="about-purpose-card">
                  <TreePine size={38} />
                  <h3>Our Vision</h3>
                  <p>
                    To become a trusted name in farmland and agricultural
                    property services by helping people discover land
                    opportunities and build a greener future.
                  </p>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="about-purpose-card">
                  <Users size={38} />
                  <h3>Our Mission</h3>
                  <p>
                    To provide reliable property guidance, clear information
                    and friendly customer support while helping buyers
                    explore suitable farmland opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="about-reasons">
          <div className="vf-container">
            <div className="about-section-heading">
              <span>WHY VISWA FARMLAND PROPERTIES</span>
              <h2>Why Choose Us?</h2>
              <p>
                Your farmland journey deserves the right guidance and support.
              </p>
            </div>

            <div className="row g-4">
              {reasons.map(({ Icon, title, description }) => (
                <div className="col-lg-4 col-md-6" key={title}>
                  <article className="about-reason-card">
                    <div className="about-reason-icon">
                      <Icon size={32} />
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="vf-home-cta">
          <h2>Let's Find Your Dream Farmland</h2>
          <p>
            Contact Viswa Farmland Properties and let us help you explore
            available farmland opportunities.
          </p>
          <a
            href={`https://wa.me/919360940142?text=${encodeURIComponent(
                      "Hello, I am interested in your farmland properties."
                    )}`}
            target="_blank"
            rel="noreferrer"
          >
            Chat with Us on WhatsApp <ArrowRight size={17} />
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}


import React from "react";
import { SiteHeader, SiteFooter } from "./PublicProperties";
import "./contact.css";

export default function Contact() {
  const address =
    "Viswa Farmland Properties, Womens Christian College Junction, Nagercoil, Tamil Nadu 629001";

  const phone1 = "+919150102491";
  const phone2 = "+916384849747";
  const email = "viswaproperties.2026@gmail.com";

  return (
    <div className="vf-public vf-contact">
      <SiteHeader />

      <main>
        {/* Page Title */}
        {/*<section className="contact-banner">
          <div className="vf-page-title-inner">
            <h1>Contact Us</h1>
            <p>
              <a href="/">Home</a> / Contact Us
            </p>
          </div>
        </section>*/}

        <section class="contact-banner vf-page-title">
        <div class="vf-page-title-inner">
        <h1>Contact Us</h1>
        {/*<p>Explore Available Farmland and Agricultural Properties</p>*/}
        <div class="vf-breadcrumb"><a href="/">Home</a><span>/</span><b>Contact Us</b></div></div>
        </section>

        {/* Google Map */}
        <section className="contact-section">
          <div className="container-fluid p-0">
            <iframe
              title="Viswa Farmland Properties Location"
              src="https://maps.google.com/maps?q=Viswa%20Farmland%20Properties,%20Women's%20Christian%20College%20Junction,%20Nagercoil,%20Tamil%20Nadu%20629001&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="container contact-content">
            <div className="contact-heading">
              <span>CONTACT US</span>
              <h2>Get in Touch With Us</h2>
              <p>
                Looking to invest in farmland or find the perfect
                agricultural property? Viswa Farmland Properties
                is here to help. Our team provides reliable guidance,
                transparent information and personalized support.
                Contact us today to explore available farmland
                opportunities.
              </p>
            </div>

            <div className="row g-4">

              {/* Address */}
              <div className="col-lg-3 col-md-6">
                <div className="contact-card">
                  <div className="contact-icon">
                    <i className="bi bi-geo-alt" />
                  </div>
                  <h4>Our Office</h4>
                  <p>
                    Viswa Farmland Properties,
                    Womens Christian College Junction,
                    Nagercoil, Tamil Nadu - 629001
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Viswa+Farmland+Properties+Nagercoil"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="col-lg-3 col-md-6">
                <div className="contact-card">
                  <div className="contact-icon">
                    <i className="bi bi-envelope" />
                  </div>
                  <h4>Email Us</h4>
                  <p>{email}</p>
                  <a href={`mailto:${email}`}>
                    Send Email
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="col-lg-3 col-md-6">
                <div className="contact-card">
                  <div className="contact-icon">
                    <i className="bi bi-telephone" />
                  </div>
                  <h4>Call Us</h4>
                  <p>
                    {phone1}<br />
                    {phone2}
                  </p>
                  <a href={`tel:${phone1}`}>
                    Call Now
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="col-lg-3 col-md-6">
                <div className="contact-card">
                  <div className="contact-icon">
                    <i className="bi bi-whatsapp" />
                  </div>
                  <h4>WhatsApp</h4>
                  <p>
                    Have questions about farmland?
                    Chat with our property team.
                  </p>
                  <a
                    href={`https://wa.me/919150102491?text=${encodeURIComponent(
                      "Hello, I am interested in your farmland properties."
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}